use {
    crate::client::{ProgramClient, ProgramClientError, SendTransaction},
    solana_program_test::tokio::time,
    solana_sdk::{
        account::Account as BaseAccount,
        epoch_info::EpochInfo,
        hash::Hash,
        instruction::Instruction,
        program_error::ProgramError,
        pubkey::Pubkey,
        signer::{signers::Signers, Signer, SignerError},
        system_instruction,
        transaction::Transaction,
    },
    spl_associated_token_account::{
        get_associated_token_address_with_program_id, instruction::create_associated_token_account,
    },
    spl_token_2022::{
        extension::{
            confidential_transfer, default_account_state, interest_bearing_mint, memo_transfer,
            transfer_fee, ExtensionType, StateWithExtensionsOwned,
        },
        instruction, native_mint,
        solana_zk_token_sdk::{
            encryption::{auth_encryption::*, elgamal::*},
            errors::ProofError,
            instruction::transfer_with_fee::FeeParameters,
        },
        state::{Account, AccountState, Mint},
    },
    std::{
        convert::TryInto,
        fmt, io,
        sync::{Arc, RwLock},
        time::{Duration, Instant},
    },
    thiserror::Error,
};

#[derive(Error, Debug)]
pub enum TokenError {
    #[error("client error: {0}")]
    Client(ProgramClientError),
    #[error("program error: {0}")]
    Program(#[from] ProgramError),
    #[error("account not found")]
    AccountNotFound,
    #[error("invalid account owner")]
    AccountInvalidOwner,
    #[error("invalid account mint")]
    AccountInvalidMint,
    #[error("proof error: {0}")]
    Proof(ProofError),
    #[error("maximum deposit transfer amount exceeded")]
    MaximumDepositTransferAmountExceeded,
    #[error("encryption key error")]
    Key(SignerError),
    #[error("account decryption failed")]
    AccountDecryption,
    #[error("not enough funds in account")]
    NotEnoughFunds,
}
impl PartialEq for TokenError {
    fn eq(&self, other: &Self) -> bool {
        match (self, other) {
            // TODO not great, but workable for tests
            (Self::Client(ref a), Self::Client(ref b)) => a.to_string() == b.to_string(),
            (Self::Program(ref a), Self::Program(ref b)) => a == b,
            (Self::AccountNotFound, Self::AccountNotFound) => true,
            (Self::AccountInvalidOwner, Self::AccountInvalidOwner) => true,
            (Self::AccountInvalidMint, Self::AccountInvalidMint) => true,
            _ => false,
        }
    }
}

/// Encapsulates initializing an extension
#[derive(Clone, Debug, PartialEq)]
pub enum ExtensionInitializationParams {
    ConfidentialTransferMint {
        ct_mint: confidential_transfer::ConfidentialTransferMint,
    },
    DefaultAccountState {
        state: AccountState,
    },
    MintCloseAuthority {
        close_authority: Option<Pubkey>,
    },
    TransferFeeConfig {
        transfer_fee_config_authority: Option<Pubkey>,
        withdraw_withheld_authority: Option<Pubkey>,
        transfer_fee_basis_points: u16,
        maximum_fee: u64,
    },
    InterestBearingConfig {
        rate_authority: Option<Pubkey>,
        rate: i16,
    },
}
impl ExtensionInitializationParams {
    /// Get the extension type associated with the init params
    pub fn extension(&self) -> ExtensionType {
        match self {
            Self::ConfidentialTransferMint { .. } => ExtensionType::ConfidentialTransferMint,
            Self::DefaultAccountState { .. } => ExtensionType::DefaultAccountState,
            Self::MintCloseAuthority { .. } => ExtensionType::MintCloseAuthority,
            Self::TransferFeeConfig { .. } => ExtensionType::TransferFeeConfig,
            Self::InterestBearingConfig { .. } => ExtensionType::InterestBearingConfig,
        }
    }
    /// Generate an appropriate initialization instruction for the given mint
    pub fn instruction(
        self,
        token_program_id: &Pubkey,
        mint: &Pubkey,
    ) -> Result<Instruction, ProgramError> {
        match self {
            Self::ConfidentialTransferMint { ct_mint } => {
                confidential_transfer::instruction::initialize_mint(
                    token_program_id,
                    mint,
                    &ct_mint,
                )
            }
            Self::DefaultAccountState { state } => {
                default_account_state::instruction::initialize_default_account_state(
                    token_program_id,
                    mint,
                    &state,
                )
            }
            Self::MintCloseAuthority { close_authority } => {
                instruction::initialize_mint_close_authority(
                    token_program_id,
                    mint,
                    close_authority.as_ref(),
                )
            }
            Self::TransferFeeConfig {
                transfer_fee_config_authority,
                withdraw_withheld_authority,
                transfer_fee_basis_points,
                maximum_fee,
            } => transfer_fee::instruction::initialize_transfer_fee_config(
                token_program_id,
                mint,
                transfer_fee_config_authority.as_ref(),
                withdraw_withheld_authority.as_ref(),
                transfer_fee_basis_points,
                maximum_fee,
            ),
            Self::InterestBearingConfig {
                rate_authority,
                rate,
            } => interest_bearing_mint::instruction::initialize(
                token_program_id,
                mint,
                rate_authority,
                rate,
            ),
        }
    }
}

pub type TokenResult<T> = Result<T, TokenError>;

pub struct Token<T, S> {
    client: Arc<dyn ProgramClient<T>>,
    pubkey: Pubkey, /*token mint*/
    payer: S,
    program_id: Pubkey,
    memo: Arc<RwLock<Option<String>>>,
}

impl<T, S> fmt::Debug for Token<T, S>
where
    S: Signer,
{
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.debug_struct("Token")
            .field("pubkey", &self.pubkey)
            .field("payer", &self.payer.pubkey())
            .field("memo", &self.memo.read().unwrap())
            .finish()
    }
}

impl<T, S> Token<T, S>
where
    T: SendTransaction,
    S: Signer,
{
    pub fn new(
        client: Arc<dyn ProgramClient<T>>,
        program_id: &Pubkey,
        address: &Pubkey,
        payer: S,
    ) -> Self {
        Token {
            client,
            pubkey: *address,
            payer,
            program_id: *program_id,
            memo: Arc::new(RwLock::new(None)),
        }
    }

    /// Get token address.
    pub fn get_address(&self) -> &Pubkey {
        &self.pubkey
    }

    pub fn with_payer<S2: Signer>(&self, payer: S2) -> Token<T, S2> {
        Token {
            client: Arc::clone(&self.client),
            pubkey: self.pubkey,
            payer,
            program_id: self.program_id,
            memo: Arc::new(RwLock::new(None)),
        }
    }

    pub fn with_memo<M: AsRef<str>>(&self, memo: M) -> &Self {
        let mut w_memo = self.memo.write().unwrap();
        *w_memo = Some(memo.as_ref().to_string());
        self
    }

    pub async fn get_new_latest_blockhash(&self) -> TokenResult<Hash> {
        let blockhash = self
            .client
            .get_latest_blockhash()
            .await
            .map_err(TokenError::Client)?;
        let start = Instant::now();
        let mut num_retries = 0;
        while start.elapsed().as_secs() < 5 {
            let new_blockhash = self
                .client
                .get_latest_blockhash()
                .await
                .map_err(TokenError::Client)?;
            if new_blockhash != blockhash {
                return Ok(new_blockhash);
            }

            time::sleep(Duration::from_millis(200)).await;
            num_retries += 1;
        }

        Err(TokenError::Client(Box::new(io::Error::new(
            io::ErrorKind::Other,
            format!(
                "Unable to get new blockhash after {}ms (retried {} times), stuck at {}",
                start.elapsed().as_millis(),
                num_retries,
                blockhash
            ),
        ))))
    }

    pub async fn process_ixs<S2: Signers>(
        &self,
        token_instructions: &[Instruction],
        signing_keypairs: &S2,
    ) -> TokenResult<T::Output> {
        let mut instructions = vec![];
        let mut w_memo = self.memo.write().unwrap();
        if let Some(memo) = w_memo.take() {
            instructions.push(spl_memo::build_memo(memo.as_bytes(), &[]));
        }
        instructions.extend_from_slice(token_instructions);
        let latest_blockhash = self
            .client
            .get_latest_blockhash()
            .await
            .map_err(TokenError::Client)?;

        let mut tx = Transaction::new_with_payer(&instructions, Some(&self.payer.pubkey()));
        tx.try_partial_sign(&[&self.payer], latest_blockhash)
            .map_err(|error| TokenError::Client(error.into()))?;
        tx.try_sign(signing_keypairs, latest_blockhash)
            .map_err(|error| TokenError::Client(error.into()))?;

        self.client
            .send_transaction(&tx)
            .await
            .map_err(TokenError::Client)
    }

    /// Create and initialize a token.
    #[allow(clippy::too_many_arguments)]
    pub async fn create_mint<'a, S2: Signer>(
        client: Arc<dyn ProgramClient<T>>,
        program_id: &'a Pubkey,
        payer: S,
        mint_account: &'a S2,
        mint_authority: &'a Pubkey,
        freeze_authority: Option<&'a Pubkey>,
        decimals: u8,
        extension_initialization_params: Vec<ExtensionInitializationParams>,
    ) -> TokenResult<Self> {
        let mint_pubkey = mint_account.pubkey();
        let extension_types = extension_initialization_params
            .iter()
            .map(|e| e.extension())
            .collect::<Vec<_>>();
        let space = ExtensionType::get_account_len::<Mint>(&extension_types);
        let token = Self::new(client, program_id, &mint_account.pubkey(), payer);
        let mut instructions = vec![system_instruction::create_account(
            &token.payer.pubkey(),
            &mint_pubkey,
            token
                .client
                .get_minimum_balance_for_rent_exemption(space)
                .await
                .map_err(TokenError::Client)?,
            space as u64,
            program_id,
        )];
        for params in extension_initialization_params {
            instructions.push(params.instruction(program_id, &mint_pubkey)?);
        }
        instructions.push(instruction::initialize_mint(
            program_id,
            &mint_pubkey,
            mint_authority,
            freeze_authority,
            decimals,
        )?);
        token.process_ixs(&instructions, &[mint_account]).await?;

        Ok(token)
    }

    /// Create native mint
    pub async fn create_native_mint(
        client: Arc<dyn ProgramClient<T>>,
        program_id: &Pubkey,
        payer: S,
    ) -> TokenResult<Self> {
        let token = Self::new(client, program_id, &native_mint::id(), payer);
        token
            .process_ixs::<[&dyn Signer; 0]>(
                &[instruction::create_native_mint(
                    program_id,
                    &token.payer.pubkey(),
                )?],
                &[],
            )
            .await?;

        Ok(token)
    }

    /// Get the address for the associated token account.
    pub fn get_associated_token_address(&self, owner: &Pubkey) -> Pubkey {
        get_associated_token_address_with_program_id(owner, &self.pubkey, &self.program_id)
    }

    /// Create and initialize the associated account.
    pub async fn create_associated_token_account(&self, owner: &Pubkey) -> TokenResult<Pubkey> {
        self.process_ixs::<[&dyn Signer; 0]>(
            &[create_associated_token_account(
                &self.payer.pubkey(),
                owner,
                &self.pubkey,
                &self.program_id,
            )],
            &[],
        )
        .await
        .map(|_| self.get_associated_token_address(owner))
        .map_err(Into::into)
    }

    /// Create and initialize a new token account.
    pub async fn create_auxiliary_token_account(
        &self,
        account: &S,
        owner: &Pubkey,
    ) -> TokenResult<Pubkey> {
        self.create_auxiliary_token_account_with_extension_space(account, owner, vec![])
            .await
    }

    /// Create and initialize a new token account.
    pub async fn create_auxiliary_token_account_with_extension_space(
        &self,
        account: &S,
        owner: &Pubkey,
        extensions: Vec<ExtensionType>,
    ) -> TokenResult<Pubkey> {
        let state = self.get_mint_info().await?;
        let mint_extensions: Vec<ExtensionType> = state.get_extension_types()?;
        let mut required_extensions =
            ExtensionType::get_required_init_account_extensions(&mint_extensions);
        for extension_type in extensions.into_iter() {
            if !required_extensions.contains(&extension_type) {
                required_extensions.push(extension_type);
            }
        }
        let space = ExtensionType::get_account_len::<Account>(&required_extensions);
        self.process_ixs(
            &[
                system_instruction::create_account(
                    &self.payer.pubkey(),
                    &account.pubkey(),
                    self.client
                        .get_minimum_balance_for_rent_exemption(space)
                        .await
                        .map_err(TokenError::Client)?,
                    space as u64,
                    &self.program_id,
                ),
                instruction::initialize_account(
                    &self.program_id,
                    &account.pubkey(),
                    &self.pubkey,
                    owner,
                )?,
            ],
            &[account],
        )
        .await
        .map(|_| account.pubkey())
        .map_err(Into::into)
    }

    /// Retrieve a raw account
    pub async fn get_account(&self, account: &Pubkey) -> TokenResult<BaseAccount> {
        self.client
            .get_account(*account)
            .await
            .map_err(TokenError::Client)?
            .ok_or(TokenError::AccountNotFound)
    }

    /// Retrive mint information.
    pub async fn get_mint_info(&self) -> TokenResult<StateWithExtensionsOwned<Mint>> {
        let account = self.get_account(&self.pubkey).await?;
        if account.owner != self.program_id {
            return Err(TokenError::AccountInvalidOwner);
        }

        StateWithExtensionsOwned::<Mint>::unpack(account.data).map_err(Into::into)
    }

    /// Retrieve account information.
    pub async fn get_account_info(
        &self,
        account: &Pubkey,
    ) -> TokenResult<StateWithExtensionsOwned<Account>> {
        let account = self.get_account(account).await?;
        if account.owner != self.program_id {
            return Err(TokenError::AccountInvalidOwner);
        }
        let account = StateWithExtensionsOwned::<Account>::unpack(account.data)?;
        if account.base.mint != *self.get_address() {
            return Err(TokenError::AccountInvalidMint);
        }

        Ok(account)
    }

    /// Retrieve the associated account or create one if not found.
    pub async fn get_or_create_associated_account_info(
        &self,
        owner: &Pubkey,
    ) -> TokenResult<StateWithExtensionsOwned<Account>> {
        let account = self.get_associated_token_address(owner);
        match self.get_account_info(&account).await {
            Ok(account) => Ok(account),
            // AccountInvalidOwner is possible if account already received some daltons.
            Err(TokenError::AccountNotFound) | Err(TokenError::AccountInvalidOwner) => {
                self.create_associated_token_account(owner).await?;
                self.get_account_info(&account).await
            }
            Err(error) => Err(error),
        }
    }

    /// Assign a new authority to the account.
    pub async fn set_authority<S2: Signer>(
        &self,
        account: &Pubkey,
        new_authority: Option<&Pubkey>,
        authority_type: instruction::AuthorityType,
        owner: &S2,
    ) -> TokenResult<()> {
        self.process_ixs(
            &[instruction::set_authority(
                &self.program_id,
                account,
                new_authority,
                authority_type,
                &owner.pubkey(),
                &[],
            )?],
            &[owner],
        )
        .await
        .map(|_| ())
    }

    /// Mint new tokens
    pub async fn mint_to<S2: Signer>(
        &self,
        destination: &Pubkey,
        authority: &S2,
        amount: u64,
    ) -> TokenResult<()> {
        self.process_ixs(
            &[instruction::mint_to(
                &self.program_id,
                &self.pubkey,
                destination,
                &authority.pubkey(),
                &[],
                amount,
            )?],
            &[authority],
        )
        .await
        .map(|_| ())
    }

    /// Transfer tokens to another account
    pub async fn transfer_unchecked<S2: Signer>(
        &self,
        source: &Pubkey,
        destination: &Pubkey,
        authority: &S2,
        amount: u64,
    ) -> TokenResult<T::Output> {
        self.process_ixs(
            #[allow(deprecated)]
            &[instruction::transfer(
                &self.program_id,
                source,
                destination,
                &authority.pubkey(),
                &[],
                amount,
            )?],
            &[authority],
        )
        .await
    }

    /// Transfer tokens to another account
    pub async fn transfer_checked<S2: Signer>(
        &self,
        source: &Pubkey,
        destination: &Pubkey,
        authority: &S2,
        amount: u64,
        decimals: u8,
    ) -> TokenResult<T::Output> {
        self.process_ixs(
            &[instruction::transfer_checked(
                &self.program_id,
                source,
                &self.pubkey,
                destination,
                &authority.pubkey(),
                &[],
                amount,
                decimals,
            )?],
            &[authority],
        )
        .await
    }

    /// Transfer tokens to another account, given an expected fee
    pub async fn transfer_checked_with_fee<S2: Signer>(
        &self,
        source: &Pubkey,
        destination: &Pubkey,
        authority: &S2,
        amount: u64,
        decimals: u8,
        fee: u64,
    ) -> TokenResult<T::Output> {
        self.process_ixs(
            &[transfer_fee::instruction::transfer_checked_with_fee(
                &self.program_id,
                source,
                &self.pubkey,
                destination,
                &authority.pubkey(),
                &[],
                amount,
                decimals,
                fee,
            )?],
            &[authority],
        )
        .await
    }

    /// Burn tokens from account
    pub async fn burn<S2: Signer>(
        &self,
        source: &Pubkey,
        authority: &S2,
        amount: u64,
    ) -> TokenResult<T::Output> {
        self.process_ixs(
            &[instruction::burn(
                &self.program_id,
                source,
                &self.pubkey,
                &authority.pubkey(),
                &[],
                amount,
            )?],
            &[authority],
        )
        .await
    }

    /// Burn tokens from account
    pub async fn burn_checked<S2: Signer>(
        &self,
        source: &Pubkey,
        authority: &S2,
        amount: u64,
        decimals: u8,
    ) -> TokenResult<T::Output> {
        self.process_ixs(
            &[instruction::burn_checked(
                &self.program_id,
                source,
                &self.pubkey,
                &authority.pubkey(),
                &[],
                amount,
                decimals,
            )?],
            &[authority],
        )
        .await
    }

    /// Approve a delegate to spend tokens
    pub async fn approve<S2: Signer>(
        &self,
        source: &Pubkey,
        delegate: &Pubkey,
        authority: &S2,
        amount: u64,
    ) -> TokenResult<T::Output> {
        self.process_ixs(
            &[instruction::approve(
                &self.program_id,
                source,
                delegate,
                &authority.pubkey(),
                &[],
                amount,
            )?],
            &[authority],
        )
        .await
    }

    /// Approve a delegate to spend tokens, with decimal check
    pub async fn approve_checked<S2: Signer>(
        &self,
        source: &Pubkey,
        delegate: &Pubkey,
        authority: &S2,
        amount: u64,
        decimals: u8,
    ) -> TokenResult<T::Output> {
        self.process_ixs(
            &[instruction::approve_checked(
                &self.program_id,
                source,
                &self.pubkey,
                delegate,
                &authority.pubkey(),
                &[],
                amount,
                decimals,
            )?],
            &[authority],
        )
        .await
    }

    /// Revoke a delegate
    pub async fn revoke<S2: Signer>(
        &self,
        source: &Pubkey,
        authority: &S2,
    ) -> TokenResult<T::Output> {
        self.process_ixs(
            &[instruction::revoke(
                &self.program_id,
                source,
                &authority.pubkey(),
                &[],
            )?],
            &[authority],
        )
        .await
    }

    /// Close account into another
    pub async fn close_account<S2: Signer>(
        &self,
        account: &Pubkey,
        destination: &Pubkey,
        authority: &S2,
    ) -> TokenResult<T::Output> {
        self.process_ixs(
            &[instruction::close_account(
                &self.program_id,
                account,
                destination,
                &authority.pubkey(),
                &[],
            )?],
            &[authority],
        )
        .await
    }

    /// Freeze a token account
    pub async fn freeze_account<S2: Signer>(
        &self,
        account: &Pubkey,
        authority: &S2,
    ) -> TokenResult<T::Output> {
        self.process_ixs(
            &[instruction::freeze_account(
                &self.program_id,
                account,
                &self.pubkey,
                &authority.pubkey(),
                &[],
            )?],
            &[authority],
        )
        .await
    }

    /// Thaw / unfreeze a token account
    pub async fn thaw_account<S2: Signer>(
        &self,
        account: &Pubkey,
        authority: &S2,
    ) -> TokenResult<T::Output> {
        self.process_ixs(
            &[instruction::thaw_account(
                &self.program_id,
                account,
                &self.pubkey,
                &authority.pubkey(),
                &[],
            )?],
            &[authority],
        )
        .await
    }

    /// Sync native account daltons
    pub async fn sync_native(&self, account: &Pubkey) -> TokenResult<T::Output> {
        self.process_ixs::<[&dyn Signer; 0]>(
            &[instruction::sync_native(&self.program_id, account)?],
            &[],
        )
        .await
    }

    /// Set transfer fee
    pub async fn set_transfer_fee<S2: Signer>(
        &self,
        authority: &S2,
        transfer_fee_basis_points: u16,
        maximum_fee: u64,
    ) -> TokenResult<T::Output> {
        self.process_ixs(
            &[transfer_fee::instruction::set_transfer_fee(
                &self.program_id,
                &self.pubkey,
                &authority.pubkey(),
                &[],
                transfer_fee_basis_points,
                maximum_fee,
            )?],
            &[authority],
        )
        .await
    }

    /// Set default account state on mint
    pub async fn set_default_account_state<S2: Signer>(
        &self,
        authority: &S2,
        state: &AccountState,
    ) -> TokenResult<T::Output> {
        self.process_ixs(
            &[
                default_account_state::instruction::update_default_account_state(
                    &self.program_id,
                    &self.pubkey,
                    &authority.pubkey(),
                    &[],
                    state,
                )?,
            ],
            &[authority],
        )
        .await
    }

    /// Harvest withheld tokens to mint
    pub async fn harvest_withheld_tokens_to_mint(
        &self,
        sources: &[&Pubkey],
    ) -> TokenResult<T::Output> {
        self.process_ixs::<[&dyn Signer; 0]>(
            &[transfer_fee::instruction::harvest_withheld_tokens_to_mint(
                &self.program_id,
                &self.pubkey,
                sources,
            )?],
            &[],
        )
        .await
    }

    /// Withdraw withheld tokens from mint
    pub async fn withdraw_withheld_tokens_from_mint<S2: Signer>(
        &self,
        destination: &Pubkey,
        authority: &S2,
    ) -> TokenResult<T::Output> {
        self.process_ixs(
            &[
                transfer_fee::instruction::withdraw_withheld_tokens_from_mint(
                    &self.program_id,
                    &self.pubkey,
                    destination,
                    &authority.pubkey(),
                    &[],
                )?,
            ],
            &[authority],
        )
        .await
    }

    /// Withdraw withheld tokens from accounts
    pub async fn withdraw_withheld_tokens_from_accounts<S2: Signer>(
        &self,
        destination: &Pubkey,
        authority: &S2,
        sources: &[&Pubkey],
    ) -> TokenResult<T::Output> {
        self.process_ixs(
            &[
                transfer_fee::instruction::withdraw_withheld_tokens_from_accounts(
                    &self.program_id,
                    &self.pubkey,
                    destination,
                    &authority.pubkey(),
                    &[],
                    sources,
                )?,
            ],
            &[authority],
        )
        .await
    }

    /// Reallocate a token account to be large enough for a set of ExtensionTypes
    pub async fn reallocate<S2: Signer>(
        &self,
        account: &Pubkey,
        authority: &S2,
        extension_types: &[ExtensionType],
    ) -> TokenResult<T::Output> {
        self.process_ixs(
            &[instruction::reallocate(
                &self.program_id,
                account,
                &self.payer.pubkey(),
                &authority.pubkey(),
                &[],
                extension_types,
            )?],
            &[authority],
        )
        .await
    }

    /// Require memos on transfers into this account
    pub async fn enable_required_transfer_memos<S2: Signer>(
        &self,
        account: &Pubkey,
        authority: &S2,
    ) -> TokenResult<T::Output> {
        self.process_ixs(
            &[memo_transfer::instruction::enable_required_transfer_memos(
                &self.program_id,
                account,
                &authority.pubkey(),
                &[],
            )?],
            &[authority],
        )
        .await
    }

    /// Stop requiring memos on transfers into this account
    pub async fn disable_required_transfer_memos<S2: Signer>(
        &self,
        account: &Pubkey,
        authority: &S2,
    ) -> TokenResult<T::Output> {
        self.process_ixs(
            &[memo_transfer::instruction::disable_required_transfer_memos(
                &self.program_id,
                account,
                &authority.pubkey(),
                &[],
            )?],
            &[authority],
        )
        .await
    }

    /// Update interest rate
    pub async fn update_interest_rate<S2: Signer>(
        &self,
        authority: &S2,
        new_rate: i16,
    ) -> TokenResult<T::Output> {
        self.process_ixs(
            &[interest_bearing_mint::instruction::update_rate(
                &self.program_id,
                self.get_address(),
                &authority.pubkey(),
                &[],
                new_rate,
            )?],
            &[authority],
        )
        .await
    }

    /// Update confidential transfer mint
    pub async fn confidential_transfer_update_mint<S2: Signer>(
        &self,
        authority: &S2,
        new_ct_mint: confidential_transfer::ConfidentialTransferMint,
        new_authority: Option<&S2>,
    ) -> TokenResult<T::Output> {
        let mut signers = vec![authority];
        if let Some(new_authority) = new_authority {
            signers.push(new_authority);
        }
        self.process_ixs(
            &[confidential_transfer::instruction::update_mint(
                &self.program_id,
                &self.pubkey,
                &new_ct_mint,
                &authority.pubkey(),
            )?],
            &signers,
        )
        .await
    }

    /// Configures confidential transfers for a token account
    pub async fn confidential_transfer_configure_token_account<S2: Signer>(
        &self,
        token_account: &Pubkey,
        authority: &S2,
    ) -> TokenResult<T::Output> {
        let maximum_pending_balance_credit_counter =
            2 << confidential_transfer::MAXIMUM_DEPOSIT_TRANSFER_AMOUNT_BIT_LENGTH;

        self.confidential_transfer_configure_token_account_with_pending_counter(
            token_account,
            authority,
            maximum_pending_balance_credit_counter,
        )
        .await
    }

    pub async fn confidential_transfer_configure_token_account_with_pending_counter<S2: Signer>(
        &self,
        token_account: &Pubkey,
        authority: &S2,
        maximum_pending_balance_credit_counter: u64,
    ) -> TokenResult<T::Output> {
        let elgamal_pubkey = ElGamalKeypair::new(authority, token_account)
            .map_err(TokenError::Key)?
            .public;
        let decryptable_zero_balance = AeKey::new(authority, token_account)
            .map_err(TokenError::Key)?
            .encrypt(0);

        self.confidential_transfer_configure_token_account_with_pending_counter_and_keypair(
            token_account,
            authority,
            maximum_pending_balance_credit_counter,
            elgamal_pubkey,
            decryptable_zero_balance,
        )
        .await
    }

    pub async fn confidential_transfer_configure_token_account_with_pending_counter_and_keypair<
        S2: Signer,
    >(
        &self,
        token_account: &Pubkey,
        authority: &S2,
        maximum_pending_balance_credit_counter: u64,
        elgamal_pubkey: ElGamalPubkey,
        decryptable_zero_balance: AeCiphertext,
    ) -> TokenResult<T::Output> {
        self.process_ixs(
            &[confidential_transfer::instruction::configure_account(
                &self.program_id,
                token_account,
                &self.pubkey,
                elgamal_pubkey.into(),
                decryptable_zero_balance,
                maximum_pending_balance_credit_counter,
                &authority.pubkey(),
                &[],
            )?],
            &[authority],
        )
        .await
    }

    /// Approves a token account for confidential transfers
    pub async fn confidential_transfer_approve_account<S2: Signer>(
        &self,
        token_account: &Pubkey,
        authority: &S2,
    ) -> TokenResult<T::Output> {
        self.process_ixs(
            &[confidential_transfer::instruction::approve_account(
                &self.program_id,
                token_account,
                &self.pubkey,
                &authority.pubkey(),
            )?],
            &[authority],
        )
        .await
    }

    /// Prepare a token account with the confidential transfer extension for closing
    pub async fn confidential_transfer_empty_account<S2: Signer>(
        &self,
        token_account: &Pubkey,
        authority: &S2,
    ) -> TokenResult<T::Output> {
        let elgamal_keypair =
            ElGamalKeypair::new(authority, token_account).map_err(TokenError::Key)?;
        self.confidential_transfer_empty_account_with_keypair(
            token_account,
            authority,
            &elgamal_keypair,
        )
        .await
    }

    pub async fn confidential_transfer_empty_account_with_keypair<S2: Signer>(
        &self,
        token_account: &Pubkey,
        authority: &S2,
        elgamal_keypair: &ElGamalKeypair,
    ) -> TokenResult<T::Output> {
        let state = self.get_account_info(token_account).await.unwrap();
        let extension =
            state.get_extension::<confidential_transfer::ConfidentialTransferAccount>()?;

        let proof_data = confidential_transfer::instruction::CloseAccountData::new(
            elgamal_keypair,
            &extension.available_balance.try_into().unwrap(),
        )
        .map_err(TokenError::Proof)?;

        self.process_ixs(
            &confidential_transfer::instruction::empty_account(
                &self.program_id,
                token_account,
                &authority.pubkey(),
                &[],
                &proof_data,
            )?,
            &[authority],
        )
        .await
    }

    /// Fetch and decrypt the available balance of a confidential token account using the uniquely
    /// derived decryption key from a signer
    pub async fn confidential_transfer_get_available_balance<S2: Signer>(
        &self,
        token_account: &Pubkey,
        authority: &S2,
    ) -> TokenResult<u64> {
        let authenticated_encryption_key =
            AeKey::new(authority, token_account).map_err(TokenError::Key)?;

        self.confidential_transfer_get_available_balance_with_key(
            token_account,
            &authenticated_encryption_key,
        )
        .await
    }

    /// Fetch and decrypt the available balance of a confidential token account using a custom
    /// decryption key
    pub async fn confidential_transfer_get_available_balance_with_key(
        &self,
        token_account: &Pubkey,
        authenticated_encryption_key: &AeKey,
    ) -> TokenResult<u64> {
        let state = self.get_account_info(token_account).await.unwrap();
        let extension =
            state.get_extension::<confidential_transfer::ConfidentialTransferAccount>()?;

        let decryptable_balance_ciphertext: AeCiphertext = extension
            .decryptable_available_balance
            .try_into()
            .map_err(TokenError::Proof)?;
        let decryptable_balance = decryptable_balance_ciphertext
            .decrypt(authenticated_encryption_key)
            .ok_or(TokenError::AccountDecryption)?;

        Ok(decryptable_balance)
    }

    /// Fetch and decrypt the pending balance of a confidential token account using the uniquely
    /// derived decryption key from a signer
    pub async fn confidential_transfer_get_pending_balance<S2: Signer>(
        &self,
        token_account: &Pubkey,
        authority: &S2,
    ) -> TokenResult<u64> {
        let elgamal_keypair =
            ElGamalKeypair::new(authority, token_account).map_err(TokenError::Key)?;

        self.confidential_transfer_get_pending_balance_with_key(token_account, &elgamal_keypair)
            .await
    }

    /// Fetch and decrypt the pending balance of a confidential token account using a custom
    /// decryption key
    pub async fn confidential_transfer_get_pending_balance_with_key(
        &self,
        token_account: &Pubkey,
        elgamal_keypair: &ElGamalKeypair,
    ) -> TokenResult<u64> {
        let state = self.get_account_info(token_account).await.unwrap();
        let extension =
            state.get_extension::<confidential_transfer::ConfidentialTransferAccount>()?;

        // decrypt pending balance
        let pending_balance_lo = extension
            .pending_balance_lo
            .decrypt(&elgamal_keypair.secret)
            .ok_or(TokenError::AccountDecryption)?;
        let pending_balance_hi = extension
            .pending_balance_hi
            .decrypt(&elgamal_keypair.secret)
            .ok_or(TokenError::AccountDecryption)?;

        let pending_balance = pending_balance_lo
            .checked_add(pending_balance_hi << confidential_transfer::PENDING_BALANCE_HI_BIT_LENGTH)
            .ok_or(TokenError::AccountDecryption)?;

        Ok(pending_balance)
    }

    pub async fn confidential_transfer_get_withheld_amount<S2: Signer>(
        &self,
        withdraw_withheld_authority: &S2,
        sources: &[&Pubkey],
    ) -> TokenResult<u64> {
        let withdraw_withheld_authority_elgamal_keypair =
            ElGamalKeypair::new(withdraw_withheld_authority, &self.pubkey)
                .map_err(TokenError::Key)?;

        self.confidential_transfer_get_withheld_amount_with_key(
            &withdraw_withheld_authority_elgamal_keypair,
            sources,
        )
        .await
    }

    pub async fn confidential_transfer_get_withheld_amount_with_key(
        &self,
        withdraw_withheld_authority_elgamal_keypair: &ElGamalKeypair,
        sources: &[&Pubkey],
    ) -> TokenResult<u64> {
        let mut aggregate_withheld_amount_ciphertext = ElGamalCiphertext::default();
        for &source in sources {
            let state = self.get_account_info(source).await.unwrap();
            let extension =
                state.get_extension::<confidential_transfer::ConfidentialTransferAccount>()?;

            let withheld_amount_ciphertext: ElGamalCiphertext =
                extension.withheld_amount.try_into().unwrap();

            aggregate_withheld_amount_ciphertext =
                aggregate_withheld_amount_ciphertext + withheld_amount_ciphertext;
        }

        let aggregate_withheld_amount = aggregate_withheld_amount_ciphertext
            .decrypt_u32(&withdraw_withheld_authority_elgamal_keypair.secret)
            .ok_or(TokenError::AccountDecryption)?;

        Ok(aggregate_withheld_amount)
    }

    /// Fetch the ElGamal public key associated with a confidential token account
    pub async fn confidential_transfer_get_encryption_pubkey<S2: Signer>(
        &self,
        token_account: &Pubkey,
    ) -> TokenResult<ElGamalPubkey> {
        let state = self.get_account_info(token_account).await.unwrap();
        let extension =
            state.get_extension::<confidential_transfer::ConfidentialTransferAccount>()?;
        let encryption_pubkey = extension
            .encryption_pubkey
            .try_into()
            .map_err(TokenError::Proof)?;

        Ok(encryption_pubkey)
    }

    /// Fetch the ElGamal pubkey key of the auditor associated with a confidential token mint
    pub async fn confidential_transfer_get_auditor_encryption_pubkey<S2: Signer>(
        &self,
    ) -> TokenResult<ElGamalPubkey> {
        let mint_state = self.get_mint_info().await.unwrap();
        let ct_mint =
            mint_state.get_extension::<confidential_transfer::ConfidentialTransferMint>()?;
        let auditor_pubkey = ct_mint
            .auditor_encryption_pubkey
            .try_into()
            .map_err(TokenError::Proof)?;

        Ok(auditor_pubkey)
    }

    /// Fetch the ElGamal pubkey key of the withdraw withheld authority associated with a
    /// confidential token mint
    pub async fn confidential_transfer_get_withdraw_withheld_authority_encryption_pubkey<
        S2: Signer,
    >(
        &self,
    ) -> TokenResult<ElGamalPubkey> {
        let mint_state = self.get_mint_info().await.unwrap();
        let ct_mint =
            mint_state.get_extension::<confidential_transfer::ConfidentialTransferMint>()?;
        let auditor_pubkey = ct_mint
            .withdraw_withheld_authority_encryption_pubkey
            .try_into()
            .map_err(TokenError::Proof)?;

        Ok(auditor_pubkey)
    }

    /// Deposit SPL Tokens into the pending balance of a confidential token account
    pub async fn confidential_transfer_deposit<S2: Signer>(
        &self,
        source_token_account: &Pubkey,
        destination_token_account: &Pubkey,
        source_token_authority: &S2,
        amount: u64,
        decimals: u8,
    ) -> TokenResult<T::Output> {
        if amount >> confidential_transfer::MAXIMUM_DEPOSIT_TRANSFER_AMOUNT_BIT_LENGTH != 0 {
            return Err(TokenError::MaximumDepositTransferAmountExceeded);
        }

        self.process_ixs(
            &[confidential_transfer::instruction::deposit(
                &self.program_id,
                source_token_account,
                &self.pubkey,
                destination_token_account,
                amount,
                decimals,
                &source_token_authority.pubkey(),
                &[],
            )?],
            &[source_token_authority],
        )
        .await
    }

    /// Withdraw SPL Tokens from the available balance of a confidential token account using the
    /// uniquely derived decryption key from a signer
    #[allow(clippy::too_many_arguments)]
    pub async fn confidential_transfer_withdraw<S2: Signer>(
        &self,
        source_token_account: &Pubkey,
        destination_token_account: &Pubkey,
        source_token_authority: &S2,
        amount: u64,
        source_available_balance: u64,
        source_available_balance_ciphertext: &ElGamalCiphertext,
        decimals: u8,
    ) -> TokenResult<T::Output> {
        let source_elgamal_keypair =
            ElGamalKeypair::new(source_token_authority, source_token_account)
                .map_err(TokenError::Key)?;
        let source_authenticated_encryption_key =
            AeKey::new(source_token_authority, source_token_account).map_err(TokenError::Key)?;

        self.confidential_transfer_withdraw_with_key(
            source_token_account,
            destination_token_account,
            source_token_authority,
            amount,
            decimals,
            source_available_balance,
            source_available_balance_ciphertext,
            &source_elgamal_keypair,
            &source_authenticated_encryption_key,
        )
        .await
    }

    /// Withdraw SPL Tokens from the available balance of a confidential token account using custom
    /// keys
    #[allow(clippy::too_many_arguments)]
    pub async fn confidential_transfer_withdraw_with_key<S2: Signer>(
        &self,
        source_token_account: &Pubkey,
        destination_token_account: &Pubkey,
        source_token_authority: &S2,
        amount: u64,
        decimals: u8,
        source_available_balance: u64,
        source_available_balance_ciphertext: &ElGamalCiphertext,
        source_elgamal_keypair: &ElGamalKeypair,
        source_authenticated_encryption_key: &AeKey,
    ) -> TokenResult<T::Output> {
        let proof_data = confidential_transfer::instruction::WithdrawData::new(
            amount,
            source_elgamal_keypair,
            source_available_balance,
            source_available_balance_ciphertext,
        )
        .map_err(TokenError::Proof)?;

        let source_remaining_balance = source_available_balance
            .checked_sub(amount)
            .ok_or(TokenError::NotEnoughFunds)?;
        let new_source_decryptable_available_balance =
            source_authenticated_encryption_key.encrypt(source_remaining_balance);

        self.process_ixs(
            &confidential_transfer::instruction::withdraw(
                &self.program_id,
                source_token_account,
                destination_token_account,
                &self.pubkey,
                amount,
                decimals,
                new_source_decryptable_available_balance,
                &source_token_authority.pubkey(),
                &[],
                &proof_data,
            )?,
            &[source_token_authority],
        )
        .await
    }

    /// Transfer tokens confidentially using the uniquely derived decryption keys from a signer
    #[allow(clippy::too_many_arguments)]
    pub async fn confidential_transfer_transfer<S2: Signer>(
        &self,
        source_token_account: &Pubkey,
        destination_token_account: &Pubkey,
        source_token_authority: &S2,
        amount: u64,
        source_available_balance: u64,
        source_available_balance_ciphertext: &ElGamalCiphertext,
        destination_elgamal_pubkey: &ElGamalPubkey,
        auditor_elgamal_pubkey: &ElGamalPubkey,
    ) -> TokenResult<T::Output> {
        let source_elgamal_keypair =
            ElGamalKeypair::new(source_token_authority, source_token_account)
                .map_err(TokenError::Key)?;
        let source_authenticated_encryption_key =
            AeKey::new(source_token_authority, source_token_account).map_err(TokenError::Key)?;

        self.confidential_transfer_transfer_with_key(
            source_token_account,
            destination_token_account,
            source_token_authority,
            amount,
            source_available_balance,
            source_available_balance_ciphertext,
            destination_elgamal_pubkey,
            auditor_elgamal_pubkey,
            &source_elgamal_keypair,
            &source_authenticated_encryption_key,
        )
        .await
    }

    /// Transfer tokens confidentially using custom decryption keys
    #[allow(clippy::too_many_arguments)]
    pub async fn confidential_transfer_transfer_with_key<S2: Signer>(
        &self,
        source_token_account: &Pubkey,
        destination_token_account: &Pubkey,
        source_token_authority: &S2,
        amount: u64,
        source_available_balance: u64,
        source_available_balance_ciphertext: &ElGamalCiphertext,
        destination_elgamal_pubkey: &ElGamalPubkey,
        auditor_elgamal_pubkey: &ElGamalPubkey,
        source_elgamal_keypair: &ElGamalKeypair,
        source_authenticated_encryption_key: &AeKey,
    ) -> TokenResult<T::Output> {
        if amount >> confidential_transfer::MAXIMUM_DEPOSIT_TRANSFER_AMOUNT_BIT_LENGTH != 0 {
            return Err(TokenError::MaximumDepositTransferAmountExceeded);
        }

        let proof_data = confidential_transfer::instruction::TransferData::new(
            amount,
            (
                source_available_balance,
                source_available_balance_ciphertext,
            ),
            source_elgamal_keypair,
            (destination_elgamal_pubkey, auditor_elgamal_pubkey),
        )
        .map_err(TokenError::Proof)?;

        let source_remaining_balance = source_available_balance
            .checked_sub(amount)
            .ok_or(TokenError::NotEnoughFunds)?;
        let new_source_available_balance =
            source_authenticated_encryption_key.encrypt(source_remaining_balance);

        self.process_ixs(
            &confidential_transfer::instruction::transfer(
                &self.program_id,
                source_token_account,
                destination_token_account,
                &self.pubkey,
                new_source_available_balance,
                &source_token_authority.pubkey(),
                &[],
                &proof_data,
            )?,
            &[source_token_authority],
        )
        .await
    }

    /// Transfer tokens confidentially with fee using the uniquely derived decryption keys from a
    /// signer
    #[allow(clippy::too_many_arguments)]
    pub async fn confidential_transfer_transfer_with_fee<S2: Signer>(
        &self,
        source_token_account: &Pubkey,
        destination_token_account: &Pubkey,
        source_token_authority: &S2,
        amount: u64,
        source_available_balance: u64,
        source_available_balance_ciphertext: &ElGamalCiphertext,
        destination_elgamal_pubkey: &ElGamalPubkey,
        auditor_elgamal_pubkey: &ElGamalPubkey,
        withdraw_withheld_authority_elgamal_pubkey: &ElGamalPubkey,
        epoch_info: &EpochInfo,
    ) -> TokenResult<T::Output> {
        let source_elgamal_keypair =
            ElGamalKeypair::new(source_token_authority, source_token_account)
                .map_err(TokenError::Key)?;
        let source_authenticated_encryption_key =
            AeKey::new(source_token_authority, source_token_account).map_err(TokenError::Key)?;

        self.confidential_transfer_transfer_with_fee_with_key(
            source_token_account,
            destination_token_account,
            source_token_authority,
            amount,
            source_available_balance,
            source_available_balance_ciphertext,
            destination_elgamal_pubkey,
            auditor_elgamal_pubkey,
            withdraw_withheld_authority_elgamal_pubkey,
            &source_elgamal_keypair,
            &source_authenticated_encryption_key,
            epoch_info,
        )
        .await
    }

    /// Transfer tokens confidential with fee using custom decryption keys
    #[allow(clippy::too_many_arguments)]
    pub async fn confidential_transfer_transfer_with_fee_with_key<S2: Signer>(
        &self,
        source_token_account: &Pubkey,
        destination_token_account: &Pubkey,
        source_token_authority: &S2,
        amount: u64,
        source_available_balance: u64,
        source_available_balance_ciphertext: &ElGamalCiphertext,
        destination_elgamal_pubkey: &ElGamalPubkey,
        auditor_elgamal_pubkey: &ElGamalPubkey,
        withdraw_withheld_authority_elgamal_pubkey: &ElGamalPubkey,
        source_elgamal_keypair: &ElGamalKeypair,
        source_authenticated_encryption_key: &AeKey,
        epoch_info: &EpochInfo,
    ) -> TokenResult<T::Output> {
        if amount >> confidential_transfer::MAXIMUM_DEPOSIT_TRANSFER_AMOUNT_BIT_LENGTH != 0 {
            return Err(TokenError::MaximumDepositTransferAmountExceeded);
        }

        // TODO: take transfer fee params as input
        let mint_state = self.get_mint_info().await.unwrap();
        let transfer_fee_config = mint_state
            .get_extension::<transfer_fee::TransferFeeConfig>()
            .unwrap();
        let fee_parameters = transfer_fee_config.get_epoch_fee(epoch_info.epoch);

        let proof_data = confidential_transfer::instruction::TransferWithFeeData::new(
            amount,
            (
                source_available_balance,
                source_available_balance_ciphertext,
            ),
            source_elgamal_keypair,
            (destination_elgamal_pubkey, auditor_elgamal_pubkey),
            FeeParameters {
                fee_rate_basis_points: u16::from(fee_parameters.transfer_fee_basis_points),
                maximum_fee: u64::from(fee_parameters.maximum_fee),
            },
            withdraw_withheld_authority_elgamal_pubkey,
        )
        .map_err(TokenError::Proof)?;

        let source_remaining_balance = source_available_balance
            .checked_sub(amount)
            .ok_or(TokenError::NotEnoughFunds)?;
        let new_source_decryptable_balance =
            source_authenticated_encryption_key.encrypt(source_remaining_balance);

        self.process_ixs(
            &confidential_transfer::instruction::transfer_with_fee(
                &self.program_id,
                source_token_account,
                destination_token_account,
                &self.pubkey,
                new_source_decryptable_balance,
                &source_token_authority.pubkey(),
                &[],
                &proof_data,
            )?,
            &[source_token_authority],
        )
        .await
    }

    /// Applies the confidential transfer pending balance to the available balance using the
    /// uniquely derived decryption key
    pub async fn confidential_transfer_apply_pending_balance<S2: Signer>(
        &self,
        token_account: &Pubkey,
        authority: &S2,
        available_balance: u64,
        pending_balance: u64,
        expected_pending_balance_credit_counter: u64,
    ) -> TokenResult<T::Output> {
        let authenticated_encryption_key =
            AeKey::new(authority, token_account).map_err(TokenError::Key)?;

        self.confidential_transfer_apply_pending_balance_with_key(
            token_account,
            authority,
            available_balance,
            pending_balance,
            expected_pending_balance_credit_counter,
            &authenticated_encryption_key,
        )
        .await
    }

    /// Applies the confidential transfer pending balance to the available balance using a custom
    /// decryption key
    pub async fn confidential_transfer_apply_pending_balance_with_key<S2: Signer>(
        &self,
        token_account: &Pubkey,
        authority: &S2,
        available_balance: u64,
        pending_balance: u64,
        expected_pending_balance_credit_counter: u64,
        authenticated_encryption_key: &AeKey,
    ) -> TokenResult<T::Output> {
        let new_decryptable_balance = available_balance.checked_add(pending_balance).unwrap();
        let new_decryptable_balance_ciphertext =
            authenticated_encryption_key.encrypt(new_decryptable_balance);

        self.process_ixs(
            &[confidential_transfer::instruction::apply_pending_balance(
                &self.program_id,
                token_account,
                expected_pending_balance_credit_counter,
                new_decryptable_balance_ciphertext,
                &authority.pubkey(),
                &[],
            )?],
            &[authority],
        )
        .await
    }

    /// Enable confidential transfer `Deposit` and `Transfer` instructions for a token account
    pub async fn confidential_transfer_enable_balance_credits<S2: Signer>(
        &self,
        token_account: &Pubkey,
        authority: &S2,
    ) -> TokenResult<T::Output> {
        self.process_ixs(
            &[confidential_transfer::instruction::enable_balance_credits(
                &self.program_id,
                token_account,
                &authority.pubkey(),
                &[],
            )?],
            &[authority],
        )
        .await
    }

    /// Disable confidential transfer `Deposit` and `Transfer` instructions for a token account
    pub async fn confidential_transfer_disable_balance_credits<S2: Signer>(
        &self,
        token_account: &Pubkey,
        authority: &S2,
    ) -> TokenResult<T::Output> {
        self.process_ixs(
            &[confidential_transfer::instruction::disable_balance_credits(
                &self.program_id,
                token_account,
                &authority.pubkey(),
                &[],
            )?],
            &[authority],
        )
        .await
    }

    /// Withdraw withheld confidential tokens from mint using the uniquely derived decryption key
    pub async fn confidential_transfer_withdraw_withheld_tokens_from_mint<S2: Signer>(
        &self,
        withdraw_withheld_authority: &S2,
        destination_token_account: &Pubkey,
        destination_elgamal_pubkey: &ElGamalPubkey,
        withheld_amount: u64,
        withheld_amount_ciphertext: &ElGamalCiphertext,
    ) -> TokenResult<T::Output> {
        // derive withheld authority elgamal key
        let withdraw_withheld_authority_elgamal_keypair =
            ElGamalKeypair::new(withdraw_withheld_authority, &self.pubkey)
                .map_err(TokenError::Key)?;

        self.confidential_transfer_withdraw_withheld_tokens_from_mint_with_key(
            withdraw_withheld_authority,
            destination_token_account,
            destination_elgamal_pubkey,
            withheld_amount,
            withheld_amount_ciphertext,
            &withdraw_withheld_authority_elgamal_keypair,
        )
        .await
    }

    /// Withdraw withheld confidential tokens from mint using a custom decryption key
    pub async fn confidential_transfer_withdraw_withheld_tokens_from_mint_with_key<S2: Signer>(
        &self,
        withdraw_withheld_authority: &S2,
        destination_token_account: &Pubkey,
        destination_elgamal_pubkey: &ElGamalPubkey,
        withheld_amount: u64,
        withheld_amount_ciphertext: &ElGamalCiphertext,
        withdraw_withheld_authority_elgamal_keypair: &ElGamalKeypair,
    ) -> TokenResult<T::Output> {
        let proof_data = confidential_transfer::instruction::WithdrawWithheldTokensData::new(
            withdraw_withheld_authority_elgamal_keypair,
            destination_elgamal_pubkey,
            withheld_amount_ciphertext,
            withheld_amount,
        )
        .map_err(TokenError::Proof)?;

        self.process_ixs(
            &confidential_transfer::instruction::withdraw_withheld_tokens_from_mint(
                &self.program_id,
                &self.pubkey,
                destination_token_account,
                &withdraw_withheld_authority.pubkey(),
                &[],
                &proof_data,
            )?,
            &[withdraw_withheld_authority],
        )
        .await
    }

    /// Withdraw withheld confidential tokens from accounts using the uniquely derived decryption
    /// key
    pub async fn confidential_transfer_withdraw_withheld_tokens_from_accounts<S2: Signer>(
        &self,
        withdraw_withheld_authority: &S2,
        destination_token_account: &Pubkey,
        destination_elgamal_pubkey: &ElGamalPubkey,
        aggregate_withheld_amount: u64,
        aggregate_withheld_amount_ciphertext: &ElGamalCiphertext,
        sources: &[&Pubkey],
    ) -> TokenResult<T::Output> {
        let withdraw_withheld_authority_elgamal_keypair =
            ElGamalKeypair::new(withdraw_withheld_authority, &self.pubkey)
                .map_err(TokenError::Key)?;

        self.confidential_transfer_withdraw_withheld_tokens_from_accounts_with_key(
            withdraw_withheld_authority,
            destination_token_account,
            destination_elgamal_pubkey,
            aggregate_withheld_amount,
            aggregate_withheld_amount_ciphertext,
            &withdraw_withheld_authority_elgamal_keypair,
            sources,
        )
        .await
    }

    /// Withdraw withheld confidential tokens from accounts using a custom decryption key
    #[allow(clippy::too_many_arguments)]
    pub async fn confidential_transfer_withdraw_withheld_tokens_from_accounts_with_key<
        S2: Signer,
    >(
        &self,
        withdraw_withheld_authority: &S2,
        destination_token_account: &Pubkey,
        destination_elgamal_pubkey: &ElGamalPubkey,
        aggregate_withheld_amount: u64,
        aggregate_withheld_amount_ciphertext: &ElGamalCiphertext,
        withdraw_withheld_authority_elgamal_keypair: &ElGamalKeypair,
        sources: &[&Pubkey],
    ) -> TokenResult<T::Output> {
        let proof_data = confidential_transfer::instruction::WithdrawWithheldTokensData::new(
            withdraw_withheld_authority_elgamal_keypair,
            destination_elgamal_pubkey,
            aggregate_withheld_amount_ciphertext,
            aggregate_withheld_amount,
        )
        .map_err(TokenError::Proof)?;

        self.process_ixs(
            &confidential_transfer::instruction::withdraw_withheld_tokens_from_accounts(
                &self.program_id,
                &self.pubkey,
                destination_token_account,
                &withdraw_withheld_authority.pubkey(),
                &[],
                sources,
                &proof_data,
            )?,
            &[withdraw_withheld_authority],
        )
        .await
    }

    /// Harvest withheld confidential tokens to mint
    pub async fn confidential_transfer_harvest_withheld_tokens_to_mint(
        &self,
        sources: &[&Pubkey],
    ) -> TokenResult<T::Output> {
        self.process_ixs::<[&dyn Signer; 0]>(
            &[
                confidential_transfer::instruction::harvest_withheld_tokens_to_mint(
                    &self.program_id,
                    &self.pubkey,
                    sources,
                )?,
            ],
            &[],
        )
        .await
    }
}
