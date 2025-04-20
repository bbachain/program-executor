//! SPL Token Metadata

pub mod constants;
pub mod error;
pub mod instruction;
pub mod processor;
pub mod state;
pub mod utils;

#[cfg(not(feature = "no-entrypoint"))]
pub mod entrypoint;

// SPL Token Metadata Program ID
solana_program::declare_id!("metaAig5QsCBSfstkwqPQxzdjXdUB8JxjfvtvEPNe3F");
