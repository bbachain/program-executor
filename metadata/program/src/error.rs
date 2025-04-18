use solana_program::program_error::ProgramError;
use thiserror::Error;

#[derive(Error, Debug, Copy, Clone)]
pub enum MetadataError {
    #[error("Name too long")]
    NameTooLong,
    #[error("Symbol too long")]
    SymbolTooLong,
    #[error("URI too long")]
    UriTooLong,
    #[error("Metadata account already initialized")]
    AlreadyInitialized,
    #[error("Metadata account not initialized")]
    NotInitialized,
    #[error("Invalid metadata authority")]
    InvalidAuthority,
    #[error("Invalid metadata PDA")]
    InvalidPda,
    #[error("Mint is not initialized")]
    UninitializedMint,
    #[error("Deserialization failed")]
    DeserializationError,
}

impl From<MetadataError> for ProgramError {
    fn from(e: MetadataError) -> Self {
        ProgramError::Custom(e as u32)
    }
}
