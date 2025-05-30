use num_derive::FromPrimitive;
use solana_program::{
    decode_error::DecodeError,
    msg,
    program_error::{PrintProgramError, ProgramError},
};
use thiserror::Error;

/// Errors that may be returned by the Metadata program.
#[derive(Clone, Debug, Eq, Error, FromPrimitive, PartialEq)]
pub enum MetadataError {
    /// 0 Failed to unpack instruction data
    #[error("")]
    InstructionUnpackError,

    /// Failed to pack instruction data
    #[error("")]
    InstructionPackError,

    /// Lamport balance below rent-exempt threshold.
    #[error("Lamport balance below rent-exempt threshold")]
    NotRentExempt,

    /// Already initialized
    #[error("Already initialized")]
    AlreadyInitialized,

    /// Uninitialized
    #[error("Uninitialized")]
    Uninitialized,

    ///  Metadata's key must match seed of ['metadata', program id, mint] provided
    #[error(" Metadata's key must match seed of ['metadata', program id, mint] provided")]
    InvalidMetadataKey,

    ///  Edition's key must match seed of ['metadata', program id, name, 'edition'] provided
    #[error("Edition's key must match seed of ['metadata', program id, name, 'edition'] provided")]
    InvalidEditionKey,

    /// Update Authority given does not match
    #[error("Update Authority given does not match")]
    UpdateAuthorityIncorrect,

    /// Update Authority needs to be signer to update metadata
    #[error("Update Authority needs to be signer to update metadata")]
    UpdateAuthorityIsNotSigner,

    /// You must be the mint authority and signer on this transaction
    #[error("You must be the mint authority and signer on this transaction")]
    NotMintAuthority,

    /// 10 - Mint authority provided does not match the authority on the mint
    #[error("Mint authority provided does not match the authority on the mint")]
    InvalidMintAuthority,

    /// Name too long
    #[error("Name too long")]
    NameTooLong,

    /// Symbol too long
    #[error("Symbol too long")]
    SymbolTooLong,

    /// URI too long
    #[error("URI too long")]
    UriTooLong,

    /// Update authority must be equivalent to the metadata's authority and also signer of this transaction
    #[error("")]
    UpdateAuthorityMustBeEqualToMetadataAuthorityAndSigner,

    /// Mint given does not match mint on Metadata
    #[error("Mint given does not match mint on Metadata")]
    MintMismatch,

    /// Editions must have exactly one token
    #[error("Editions must have exactly one token")]
    EditionsMustHaveExactlyOneToken,

    /// Maximum editions printed already
    #[error("")]
    MaxEditionsMintedAlready,

    /// Token mint to failed
    #[error("")]
    TokenMintToFailed,

    /// The master edition record passed must match the master record on the edition given
    #[error("")]
    MasterRecordMismatch,

    /// 20 - The destination account does not have the right mint
    #[error("")]
    DestinationMintMismatch,

    /// An edition can only mint one of its kind!
    #[error("")]
    EditionAlreadyMinted,

    /// Printing mint decimals should be zero
    #[error("")]
    PrintingMintDecimalsShouldBeZero,

    /// OneTimePrintingAuthorizationMint mint decimals should be zero
    #[error("")]
    OneTimePrintingAuthorizationMintDecimalsShouldBeZero,

    /// Edition mint decimals should be zero
    #[error("EditionMintDecimalsShouldBeZero")]
    EditionMintDecimalsShouldBeZero,

    /// Token burn failed
    #[error("")]
    TokenBurnFailed,

    /// The One Time authorization mint does not match that on the token account!
    #[error("")]
    TokenAccountOneTimeAuthMintMismatch,

    /// Derived key invalid
    #[error("Derived key invalid")]
    DerivedKeyInvalid,

    /// The Printing mint does not match that on the master edition!
    #[error("The Printing mint does not match that on the master edition!")]
    PrintingMintMismatch,

    /// The  One Time Printing Auth mint does not match that on the master edition!
    #[error("The One Time Printing Auth mint does not match that on the master edition!")]
    OneTimePrintingAuthMintMismatch,

    /// 30 - The mint of the token account does not match the Printing mint!
    #[error("The mint of the token account does not match the Printing mint!")]
    TokenAccountMintMismatch,

    /// The mint of the token account does not match the master metadata mint!
    #[error("The mint of the token account does not match the master metadata mint!")]
    TokenAccountMintMismatchV2,

    /// Not enough tokens to mint a limited edition
    #[error("Not enough tokens to mint a limited edition")]
    NotEnoughTokens,

    /// The mint on your authorization token holding account does not match your Printing mint!
    #[error("")]
    PrintingMintAuthorizationAccountMismatch,

    /// The authorization token account has a different owner than the update authority for the master edition!
    #[error("")]
    AuthorizationTokenAccountOwnerMismatch,

    /// This feature is currently disabled.
    #[error("")]
    Disabled,

    /// Creators list too long
    #[error("Creators list too long")]
    CreatorsTooLong,

    /// Creators must be at least one if set
    #[error("Creators must be at least one if set")]
    CreatorsMustBeAtleastOne,

    /// If using a creators array, you must be one of the creators listed
    #[error("")]
    MustBeOneOfCreators,

    /// This metadata does not have creators
    #[error("This metadata does not have creators")]
    NoCreatorsPresentOnMetadata,

    /// 40 - This creator address was not found
    #[error("This creator address was not found")]
    CreatorNotFound,

    /// Basis points cannot be more than 10000
    #[error("Basis points cannot be more than 10000")]
    InvalidBasisPoints,

    /// Primary sale can only be flipped to true and is immutable
    #[error("Primary sale can only be flipped to true and is immutable")]
    PrimarySaleCanOnlyBeFlippedToTrue,

    /// Owner does not match that on the account given
    #[error("Owner does not match that on the account given")]
    OwnerMismatch,

    /// This account has no tokens to be used for authorization
    #[error("This account has no tokens to be used for authorization")]
    NoBalanceInAccountForAuthorization,

    /// Share total must equal 100 for creator array
    #[error("Share total must equal 100 for creator array")]
    ShareTotalMustBe100,

    /// This reservation list already exists!
    #[error("")]
    ReservationExists,

    /// This reservation list does not exist!
    #[error("")]
    ReservationDoesNotExist,

    /// This reservation list exists but was never set with reservations
    #[error("")]
    ReservationNotSet,

    /// This reservation list has already been set!
    #[error("")]
    ReservationAlreadyMade,

    /// 50 - Provided more addresses than max allowed in single reservation
    #[error("")]
    BeyondMaxAddressSize,

    /// NumericalOverflowError
    #[error("NumericalOverflowError")]
    NumericalOverflowError,

    /// This reservation would go beyond the maximum supply of the master edition!
    #[error("")]
    ReservationBreachesMaximumSupply,

    /// Address not in reservation!
    #[error("")]
    AddressNotInReservation,

    /// You cannot unilaterally verify another creator, they must sign
    #[error("You cannot unilaterally verify another creator, they must sign")]
    CannotVerifyAnotherCreator,

    /// You cannot unilaterally unverify another creator
    #[error("You cannot unilaterally unverify another creator")]
    CannotUnverifyAnotherCreator,

    /// In initial reservation setting, spots remaining should equal total spots
    #[error("")]
    SpotMismatch,

    /// Incorrect account owner
    #[error("Incorrect account owner")]
    IncorrectOwner,

    /// printing these tokens would breach the maximum supply limit of the master edition
    #[error("")]
    PrintingWouldBreachMaximumSupply,

    /// Data is immutable
    #[error("Data is immutable")]
    DataIsImmutable,

    /// 60 - No duplicate creator addresses
    #[error("No duplicate creator addresses")]
    DuplicateCreatorAddress,

    /// Reservation spots remaining should match total spots when first being created
    #[error("")]
    ReservationSpotsRemainingShouldMatchTotalSpotsAtStart,

    /// Invalid token program
    #[error("Invalid token program")]
    InvalidTokenProgram,

    /// Data type mismatch
    #[error("Data type mismatch")]
    DataTypeMismatch,

    /// Beyond alotted address size in reservation!
    #[error("")]
    BeyondAlottedAddressSize,

    /// The reservation has only been partially alotted
    #[error("")]
    ReservationNotComplete,

    /// You cannot splice over an existing reservation!
    #[error("")]
    TriedToReplaceAnExistingReservation,

    /// Invalid operation
    #[error("Invalid operation")]
    InvalidOperation,

    /// Invalid owner
    #[error("Invalid Owner")]
    InvalidOwner,

    /// Printing mint supply must be zero for conversion
    #[error("Printing mint supply must be zero for conversion")]
    PrintingMintSupplyMustBeZeroForConversion,

    /// 70 - One Time Auth mint supply must be zero for conversion
    #[error("One Time Auth mint supply must be zero for conversion")]
    OneTimeAuthMintSupplyMustBeZeroForConversion,

    /// You tried to insert one edition too many into an edition mark pda
    #[error("You tried to insert one edition too many into an edition mark pda")]
    InvalidEditionIndex,

    // In the legacy system the reservation needs to be of size one for cpu limit reasons
    #[error("")]
    ReservationArrayShouldBeSizeOne,

    /// Is Mutable can only be flipped to false
    #[error("Is Mutable can only be flipped to false")]
    IsMutableCanOnlyBeFlippedToFalse,

    #[error("Collection cannot be verified in this instruction")]
    CollectionCannotBeVerifiedInThisInstruction,

    #[error("This instruction was deprecated in a previous release and is now removed")]
    Removed, //For the curious we cannot get rid of an instruction in the enum or move them or it will break our api, this is a friendly way to get rid of them

    #[error("")]
    MustBeBurned,

    #[error("This use method is invalid")]
    InvalidUseMethod,

    #[error("Cannot Change Use Method after the first use")]
    CannotChangeUseMethodAfterFirstUse,

    #[error("Cannot Change Remaining or Available uses after the first use")]
    CannotChangeUsesAfterFirstUse,

    // 80
    #[error("Collection Not Found on Metadata")]
    CollectionNotFound,

    #[error("Collection Update Authority is invalid")]
    InvalidCollectionUpdateAuthority,

    #[error("Collection Must Be a Unique Master Edition v2")]
    CollectionMustBeAUniqueMasterEdition,

    #[error("The Use Authority Record Already Exists, to modify it Revoke, then Approve")]
    UseAuthorityRecordAlreadyExists,

    #[error("The Use Authority Record is empty or already revoked")]
    UseAuthorityRecordAlreadyRevoked,

    #[error("This token has no uses")]
    Unusable,

    #[error("There are not enough Uses left on this token.")]
    NotEnoughUses,

    #[error("This Collection Authority Record Already Exists.")]
    CollectionAuthorityRecordAlreadyExists,

    #[error("This Collection Authority Record Does Not Exist.")]
    CollectionAuthorityDoesNotExist,

    #[error("This Use Authority Record is invalid.")]
    InvalidUseAuthorityRecord,

    // 90
    #[error("")]
    InvalidCollectionAuthorityRecord,

    #[error("Metadata does not match the freeze authority on the mint")]
    InvalidFreezeAuthority,

    #[error("All tokens in this account have not been delegated to this user.")]
    InvalidDelegate,

    #[error("")]
    CannotAdjustVerifiedCreator,

    #[error("Verified creators cannot be removed.")]
    CannotRemoveVerifiedCreator,

    #[error("")]
    CannotWipeVerifiedCreators,

    #[error("")]
    NotAllowedToChangeSellerFeeBasisPoints,

    /// Edition override cannot be zero
    #[error("Edition override cannot be zero")]
    EditionOverrideCannotBeZero,

    #[error("Invalid User")]
    InvalidUser,

    /// Revoke Collection Authority signer is incorrect
    #[error("Revoke Collection Authority signer is incorrect")]
    RevokeCollectionAuthoritySignerIncorrect,

    // 100
    #[error("")]
    TokenCloseFailed,

    /// 101 - Calling v1.3 function on unsized collection
    #[error("Can't use this function on unsized collection")]
    UnsizedCollection,

    /// 102 - Calling v1.2 function on a sized collection
    #[error("Can't use this function on a sized collection")]
    SizedCollection,

    /// 103 - Missing collection metadata account.
    #[error("Missing collection metadata account")]
    MissingCollectionMetadata,

    /// 104 - This NFT is not a member of the specified collection.
    #[error("This NFT is not a member of the specified collection.")]
    NotAMemberOfCollection,

    /// 105 - This NFT is not a verified member of the specified collection.
    #[error("This NFT is not a verified member of the specified collection.")]
    NotVerifiedMemberOfCollection,

    /// 106 - This NFT is not a collection parent NFT.
    #[error("This NFT is not a collection parent NFT.")]
    NotACollectionParent,

    /// 107 - Could not determine a TokenStandard type.
    #[error("Could not determine a TokenStandard type.")]
    CouldNotDetermineTokenStandard,

    /// 108 - Missing edition account for a non-fungible token type.
    #[error("This mint account has an edition but none was provided.")]
    MissingEditionAccount,

    /// 109 - Not a Master Edition
    #[error("This edition is not a Master Edition")]
    NotAMasterEdition,

    /// 110 - Master Edition has prints.
    #[error("This Master Edition has existing prints")]
    MasterEditionHasPrints,

    /// 111 - Borsh Deserialization Error
    #[error("")]
    BorshDeserializationError,

    /// 112 - Cannot update a verified colleciton in this command
    #[error("Cannot update a verified collection in this command")]
    CannotUpdateVerifiedCollection,

    /// 113 - Edition Account Doesnt Match Collection
    #[error("Edition account doesnt match collection ")]
    CollectionMasterEditionAccountInvalid,

    /// 114 - Item is already verified.
    #[error("Item is already verified.")]
    AlreadyVerified,

    /// 115 - Item is already unverified.
    #[error("")]
    AlreadyUnverified,

    /// 116 - Not a Print Edition
    #[error("This edition is not a Print Edition")]
    NotAPrintEdition,

    /// 117 - Invalid Edition Marker
    #[error("Invalid Master Edition")]
    InvalidMasterEdition,

    /// 118 - Invalid Edition Marker
    #[error("Invalid Print Edition")]
    InvalidPrintEdition,

    /// 119 - Invalid Edition Marker
    #[error("Invalid Edition Marker")]
    InvalidEditionMarker,

    /// 120 - Reservation List is Deprecated
    #[error("Reservation List is Deprecated")]
    ReservationListDeprecated,

    /// 121 - Print Edition doesn't match Master Edition
    #[error("Print Edition does not match Master Edition")]
    PrintEditionDoesNotMatchMasterEdition,

    /// 122 - Edition Number greater than max supply
    #[error("Edition Number greater than max supply")]
    EditionNumberGreaterThanMaxSupply,

    /// 123 - Must unverify before migrating collections.
    #[error("Must unverify before migrating collections.")]
    MustUnverify,

    /// 124 - Invalid Escrow Account Bump Seed
    #[error("Invalid Escrow Account Bump Seed")]
    InvalidEscrowBumpSeed,

    /// 125 - Must be Escrow Authority
    #[error("Must Escrow Authority")]
    MustBeEscrowAuthority,

    /// 126 - Invalid System Program
    #[error("Invalid System Program")]
    InvalidSystemProgram,

    /// 127 - Must be a Non Fungible Token
    #[error("Must be a Non Fungible Token")]
    MustBeNonFungible,

    /// 128 - Insufficient tokens for transfer
    #[error("Insufficient tokens for transfer")]
    InsufficientTokens,

    /// 129 - Borsh Serialization Error
    #[error("Borsh Serialization Error")]
    BorshSerializationError,

    /// 130 - Cannot create NFT with no Freeze Authority.
    #[error("Cannot create NFT with no Freeze Authority.")]
    NoFreezeAuthoritySet,

    /// 131
    #[error("Invalid collection size change")]
    InvalidCollectionSizeChange,

    /// 132
    #[error("Invalid bubblegum signer")]
    InvalidBubblegumSigner,
    /// 133
    #[error("Escrow parent cannot have a delegate")]
    EscrowParentHasDelegate,

    /// 134
    #[error("Mint needs to be signer to initialize the account")]
    MintIsNotSigner,

    /// 135
    #[error("Invalid token standard")]
    InvalidTokenStandard,

    /// 136
    #[error("Invalid mint account for specified token standard")]
    InvalidMintForTokenStandard,

    /// 137
    #[error("Invalid authorization rules account")]
    InvalidAuthorizationRules,

    /// 138
    #[error("Missing authorization rules account")]
    MissingAuthorizationRules,

    /// 139
    #[error("Missing programmable configuration")]
    MissingProgrammableConfig,

    /// 140
    #[error("Invalid programmable configuration")]
    InvalidProgrammableConfig,

    /// 141
    #[error("Delegate already exists")]
    DelegateAlreadyExists,

    /// 142
    #[error("Delegate not found")]
    DelegateNotFound,

    /// 143
    #[error("Required account not set in instruction builder")]
    MissingAccountInBuilder,

    /// 144
    #[error("Required argument not set in instruction builder")]
    MissingArgumentInBuilder,

    /// 145
    #[error("Feature not supported currently")]
    FeatureNotSupported,

    /// 146
    #[error("Invalid system wallet")]
    InvalidSystemWallet,

    /// 147
    #[error("Only the sale delegate can transfer while its set")]
    OnlySaleDelegateCanTransfer,

    /// 148
    #[error("Missing token account")]
    MissingTokenAccount,

    /// 149
    #[error("Missing SPL token program")]
    MissingSplTokenProgram,

    /// 150
    #[error("Missing authorization rules program")]
    MissingAuthorizationRulesProgram,

    /// 151
    #[error("Invalid delegate role for transfer")]
    InvalidDelegateRoleForTransfer,

    /// 152
    #[error("Invalid transfer authority")]
    InvalidTransferAuthority,

    /// 153
    #[error("Instruction not supported for ProgrammableNonFungible assets")]
    InstructionNotSupported,

    /// 154
    #[error("Public key does not match expected value")]
    KeyMismatch,

    /// 155
    #[error("Token is locked")]
    LockedToken,

    /// 156
    #[error("Token is unlocked")]
    UnlockedToken,

    /// 157
    #[error("Missing delegate role")]
    MissingDelegateRole,

    /// 158
    #[error("Invalid authority type")]
    InvalidAuthorityType,

    /// 159
    #[error("Missing token record account")]
    MissingTokenRecord,

    /// 160
    #[error("Mint supply must be zero for programmable assets")]
    MintSupplyMustBeZero,

    /// 161
    #[error("Data is empty or zeroed")]
    DataIsEmptyOrZeroed,

    /// 162
    #[error("Missing token owner")]
    MissingTokenOwnerAccount,

    /// 163
    #[error("Master edition account has an invalid length")]
    InvalidMasterEditionAccountLength,

    /// 164
    #[error("Incorrect token state")]
    IncorrectTokenState,

    /// 165
    #[error("Invalid delegate role")]
    InvalidDelegateRole,

    /// 166
    #[error("Print supply is required for non-fungibles")]
    MissingPrintSupply,

    /// 167
    #[error("Missing master edition account")]
    MissingMasterEditionAccount,

    /// 168
    #[error("Amount must be greater than zero")]
    AmountMustBeGreaterThanZero,

    /// 169
    #[error("Invalid delegate args")]
    InvalidDelegateArgs,

    /// 170
    #[error("Missing address for locked transfer")]
    MissingLockedTransferAddress,

    /// 171
    #[error("Invalid destination address for locked transfer")]
    InvalidLockedTransferAddress,

    /// 172
    #[error("Exceeded account realloc increase limit")]
    DataIncrementLimitExceeded,

    /// 173
    #[error("Cannot update the rule set of a programmable asset that has a delegate")]
    CannotUpdateAssetWithDelegate,

    /// 174
    #[error("Invalid token amount for this operation or token standard")]
    InvalidAmount,

    /// 175
    #[error("Missing master edition mint account")]
    MissingMasterEditionMintAccount,

    /// 176
    #[error("Missing master edition token account")]
    MissingMasterEditionTokenAccount,

    /// 177
    #[error("Missing edition marker account")]
    MissingEditionMarkerAccount,

    /// 178
    #[error("Cannot burn while persistent delegate is set")]
    CannotBurnWithDelegate,

    /// 179
    #[error("Missing edition account")]
    MissingEdition,

    /// 180
    #[error("Invalid Associated Token Account Program")]
    InvalidAssociatedTokenAccountProgram,

    /// 181
    #[error("Invalid InstructionsSysvar")]
    InvalidInstructionsSysvar,

    /// 182
    #[error("Invalid or Unneeded parent accounts")]
    InvalidParentAccounts,

    /// 183
    #[error("Authority cannot apply all update args")]
    InvalidUpdateArgs,

    /// 184
    #[error("Token account does not have enough tokens")]
    InsufficientTokenBalance,

    /// 185
    #[error("Missing collection account")]
    MissingCollectionMint,

    /// 186
    #[error("Missing collection master edition account")]
    MissingCollectionMasterEdition,

    /// 187
    #[error("Invalid token record account")]
    InvalidTokenRecord,

    /// 188
    #[error("The close authority needs to be revoked by the Utility Delegate")]
    InvalidCloseAuthority,

    /// 189
    #[error("Invalid or removed instruction")]
    InvalidInstruction,

    /// 190
    #[error("Missing delegate record")]
    MissingDelegateRecord,

    /// 191
    #[error("")]
    InvalidFeeAccount,

    /// 192
    #[error("")]
    InvalidMetadataFlags,

    /// 193
    #[error("Cannot change the update authority with a delegate")]
    CannotChangeUpdateAuthorityWithDelegate,

    /// 194
    #[error("Invalid mint extension type")]
    InvalidMintExtensionType,

    /// 195
    #[error("Invalid mint close authority")]
    InvalidMintCloseAuthority,

    /// 196
    #[error("Invalid metadata pointer")]
    InvalidMetadataPointer,

    /// 197
    #[error("Invalid token extension type")]
    InvalidTokenExtensionType,

    /// 198
    #[error("Missing immutable owner extension")]
    MissingImmutableOwnerExtension,

    /// 199
    #[error("Expected account to be uninitialized")]
    ExpectedUninitializedAccount,

    /// 200
    #[error("Edition account has an invalid length")]
    InvalidEditionAccountLength,

    /// 201
    #[error("Account has already been resized")]
    AccountAlreadyResized,

    /// 202
    #[error("Conditions for closing not met")]
    ConditionsForClosingNotMet,
}

impl PrintProgramError for MetadataError {
    fn print<E>(&self) {
        msg!(&self.to_string());
    }
}

impl From<MetadataError> for ProgramError {
    fn from(e: MetadataError) -> Self {
        ProgramError::Custom(e as u32)
    }
}

impl<T> DecodeError<T> for MetadataError {
    fn type_of() -> &'static str {
        "Metadata Error"
    }
}
