use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    msg,
    program::invoke_signed,
    program_error::ProgramError,
    pubkey::Pubkey,
    rent::Rent,
    system_instruction,
    sysvar::Sysvar,
};
use spl_token::{solana_program::program_pack::Pack, state::Mint};

// Defineing the program ID
solana_program::declare_id!("metabUBuFKTWPWAAARaQdNXUH6Sxk5tFGQjGEgWCvaX");

// Metadata struct
#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct TokenMetadata {
    pub is_initialized: bool, // Is the metadata initialized
    pub mint: Pubkey,         // Mint account
    pub name: String,         // Token name
    pub symbol: String,       // Token symbol
    pub uri: String,          // Token URI
    pub authority: Pubkey,    // Authority
}

// Defineing the instruction enum
#[derive(BorshDeserialize, BorshSerialize)]
pub enum TokenInstruction {
    Initialize {
        name: String,
        symbol: String,
        uri: String,
    },
    Update {
        name: String,
        symbol: String,
        uri: String,
    },
}

// Entrypoint for the program
entrypoint!(process_instruction);

pub fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    let instruction = TokenInstruction::try_from_slice(instruction_data)
        .map_err(|_| ProgramError::InvalidInstructionData)?;

    match instruction {
        TokenInstruction::Initialize { name, symbol, uri } => {
            process_initialize(program_id, accounts, name, symbol, uri)
        }
        TokenInstruction::Update { name, symbol, uri } => {
            process_update(program_id, accounts, name, symbol, uri)
        }
    }
}

// Processing the Initialize instruction
fn process_initialize(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    name: String,
    symbol: String,
    uri: String,
) -> ProgramResult {
    let account_info_iter = &mut accounts.iter();
    let metadata_account = next_account_info(account_info_iter)?;
    let mint_account = next_account_info(account_info_iter)?;
    let authority = next_account_info(account_info_iter)?;
    let system_program = next_account_info(account_info_iter)?;

    // Check mint account
    let mint_data =
        Mint::unpack(&mint_account.data.borrow()).map_err(|_| ProgramError::InvalidAccountData)?; // Handle conversion error
    if !mint_data.is_initialized {
        return Err(ProgramError::UninitializedAccount);
    }

    // Create PDA account
    let (pda, bump_seed) =
        Pubkey::find_program_address(&[b"metadata", mint_account.key.as_ref()], program_id);
    if pda != *metadata_account.key {
        return Err(ProgramError::InvalidAccountData);
    }

    // Check if the metadata account is already initialized
    if metadata_account.data.borrow().len() > 0 {
        return Err(ProgramError::AccountAlreadyInitialized);
    }

    // Calculate the size of the metadata account
    let data_size = 1 + 32 + 4 + name.len() + 4 + symbol.len() + 4 + uri.len() + 32; // bool + Pubkey + String (len + data)
    let rent = Rent::get()?.minimum_balance(data_size);

    // Create the metadata account
    invoke_signed(
        &system_instruction::create_account(
            authority.key,
            metadata_account.key,
            rent,
            data_size as u64,
            program_id,
        ),
        &[
            authority.clone(),
            metadata_account.clone(),
            system_program.clone(),
        ],
        &[&[b"metadata", mint_account.key.as_ref(), &[bump_seed]]],
    )?;

    // Write metadata to the account
    let metadata = TokenMetadata {
        is_initialized: true,
        mint: *mint_account.key,
        name,
        symbol,
        uri,
        authority: *authority.key,
    };
    metadata.serialize(&mut &mut metadata_account.data.borrow_mut()[..])?;

    msg!("Metadata initialized for mint: {}", mint_account.key);
    Ok(())
}

// Processing the Update instruction
fn process_update(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    name: String,
    symbol: String,
    uri: String,
) -> ProgramResult {
    let account_info_iter = &mut accounts.iter();
    let metadata_account = next_account_info(account_info_iter)?;
    let mint_account = next_account_info(account_info_iter)?;
    let authority = next_account_info(account_info_iter)?;

    // Check mint account
    let (pda, _bump_seed) =
        Pubkey::find_program_address(&[b"metadata", mint_account.key.as_ref()], program_id);
    if pda != *metadata_account.key {
        return Err(ProgramError::InvalidAccountData);
    }

    // Check if the metadata account is already initialized
    let mut metadata = TokenMetadata::deserialize(&mut &metadata_account.data.borrow()[..])?;
    if !metadata.is_initialized {
        return Err(ProgramError::UninitializedAccount);
    }

    // Check if the authority is correct
    if metadata.authority != *authority.key {
        return Err(ProgramError::InvalidAccountData);
    }

    // Update metadata
    metadata.name = name;
    metadata.symbol = symbol;
    metadata.uri = uri;
    metadata.serialize(&mut &mut metadata_account.data.borrow_mut()[..])?;

    msg!("Metadata updated for mint: {}", mint_account.key);
    Ok(())
}
