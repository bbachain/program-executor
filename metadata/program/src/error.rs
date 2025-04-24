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
    #[error("This instruction was deprecated in a previous release and is now removed")]
    Removed, //For the curious we cannot get rid of an instruction in the enum or move them or it will break our api, this is a friendly way to get rid of them

    /// 0 Failed to unpack instruction data
    #[error("")]
    InstructionUnpackError,

    ///  Metadata's key must match seed of ['metadata', program id, mint] provided
    #[error(" Metadata's key must match seed of ['metadata', program id, mint] provided")]
    InvalidMetadataKey,

    /// NumericalOverflowError
    #[error("NumericalOverflowError")]
    NumericalOverflowError,

    /// Incorrect account owner
    #[error("Incorrect account owner")]
    IncorrectOwner,

    /// You must be the mint authority and signer on this transaction
    #[error("You must be the mint authority and signer on this transaction")]
    NotMintAuthority,

    /// Name too long
    #[error("Name too long")]
    NameTooLong,

    /// Symbol too long
    #[error("Symbol too long")]
    SymbolTooLong,

    /// URI too long
    #[error("URI too long")]
    UriTooLong,

    /// Basis points cannot be more than 10000
    #[error("Basis points cannot be more than 10000")]
    InvalidBasisPoints,

    /// Creators list too long
    #[error("Creators list too long")]
    CreatorsTooLong,

    /// Creators must be at least one if set
    #[error("Creators must be at least one if set")]
    CreatorsMustBeAtleastOne,

    /// 10 - Mint authority provided does not match the authority on the mint
    #[error("Mint authority provided does not match the authority on the mint")]
    InvalidMintAuthority,

    /// Data type mismatch
    #[error("Data type mismatch")]
    DataTypeMismatch,

    #[error("Verified creators cannot be removed.")]
    CannotRemoveVerifiedCreator,

    /// You cannot unilaterally verify another creator, they must sign
    #[error("You cannot unilaterally verify another creator, they must sign")]
    CannotVerifyAnotherCreator,

    /// You cannot unilaterally unverify another creator
    #[error("You cannot unilaterally unverify another creator")]
    CannotUnverifyAnotherCreator,

    /// Share total must equal 100 for creator array
    #[error("Share total must equal 100 for creator array")]
    ShareTotalMustBe100,

    /// 60 - No duplicate creator addresses
    #[error("No duplicate creator addresses")]
    DuplicateCreatorAddress,

    #[error("This use method is invalid")]
    InvalidUseMethod,

    #[error("Cannot Change Use Method after the first use")]
    CannotChangeUseMethodAfterFirstUse,

    #[error("Cannot Change Remaining or Available uses after the first use")]
    CannotChangeUsesAfterFirstUse,

    #[error("Collection cannot be verified in this instruction")]
    CollectionCannotBeVerifiedInThisInstruction,

    /// 189
    #[error("Invalid or removed instruction")]
    InvalidInstruction,

    /// 199
    #[error("Expected account to be uninitialized")]
    ExpectedUninitializedAccount,
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
