//! SPL Token Metadata

pub mod assertions;
pub mod constants;
#[cfg(not(feature = "no-entrypoint"))]
pub mod entrypoint;
pub mod error;
pub mod instruction;
pub mod pda;
pub mod processor;
pub mod state;
pub mod utils;

// Export current sdk types for downstream users building with a different sdk version
pub use solana_program;

// SPL Token Metadata Program ID
solana_program::declare_id!("meta9hXUUHmM7FT8haXiCVsw168kWb8UkFFhAWMEzim");
