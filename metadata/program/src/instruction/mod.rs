mod metadata;

use borsh::{BorshDeserialize, BorshSerialize};
pub use metadata::*;
#[cfg(feature = "serde-feature")]
use serde::{Deserialize, Serialize};
use shank::ShankInstruction;
use spl_token_metadata_context_derive::AccountContext;

// Deprecated Instructions
pub const CREATE_METADATA_ACCOUNT_V0: u8 = 0;
pub const UPDATE_METADATA_ACCOUNT_V0: u8 = 1;

#[repr(C)]
#[cfg_attr(feature = "serde-feature", derive(Serialize, Deserialize))]
/// Instructions supported by the Metadata program.
#[derive(BorshSerialize, BorshDeserialize, Clone, ShankInstruction, AccountContext)]
// #[rustfmt::skip]
pub enum MetadataInstruction {
    /// Create Metadata object.
    #[account(
        0,
        writable,
        name = "metadata",
        desc = "Metadata key (pda of ['metadata', program id, mint id])"
    )]
    #[account(1, name = "mint", desc = "Mint of token asset")]
    #[account(2, signer, name = "mint_authority", desc = "Mint authority")]
    #[account(3, signer, writable, name = "payer", desc = "payer")]
    #[account(
        4,
        optional_signer,
        name = "update_authority",
        desc = "update authority info"
    )]
    #[account(5, name = "system_program", desc = "System program")]
    #[account(6, optional, name = "rent", desc = "Rent info")]
    #[legacy_optional_accounts_strategy]
    CreateMetadataAccount(CreateMetadataAccountArgs),

    /// Update a Metadata with is_mutable as a parameter
    #[account(0, writable, name = "metadata", desc = "Metadata account")]
    #[account(1, signer, name = "update_authority", desc = "Update authority key")]
    UpdateMetadataAccount(UpdateMetadataAccountArgs),
}

pub struct Context<T> {
    pub accounts: T,
}

pub trait InstructionBuilder {
    fn instruction(&self) -> solana_program::instruction::Instruction;
}
