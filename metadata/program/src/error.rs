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

    /// 10 - Mint authority provided does not match the authority on the mint
    #[error("Mint authority provided does not match the authority on the mint")]
    InvalidMintAuthority,

    /// Data type mismatch
    #[error("Data type mismatch")]
    DataTypeMismatch,

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
