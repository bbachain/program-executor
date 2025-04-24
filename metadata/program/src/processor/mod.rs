mod metadata;

use borsh::BorshDeserialize;
pub use metadata::*;
use solana_program::{
    account_info::AccountInfo, entrypoint::ProgramResult, msg, program_error::ProgramError,
    pubkey::Pubkey,
};

use crate::{
    error::MetadataError,
    instruction::{MetadataInstruction, CREATE_METADATA_ACCOUNT_V0, UPDATE_METADATA_ACCOUNT_V0},
};

/// Process Token Metadata instructions.
///
/// The processor is divided into two parts:
/// * It first tries to match the instruction into the new API;
/// * If it is not one of the new instructions, it checks that any metadata
///   account is not a pNFT before forwarding the transaction processing to
///   the "legacy" processor.
pub fn process_instruction<'a>(
    program_id: &'a Pubkey,
    accounts: &'a [AccountInfo<'a>],
    input: &[u8],
) -> ProgramResult {
    let (variant, _args) = input
        .split_first()
        .ok_or(MetadataError::InvalidInstruction)?;

    let instruction = match MetadataInstruction::try_from_slice(input) {
        Ok(instruction) => Ok(instruction),
        // Check if the instruction is a deprecated instruction.
        Err(_) => match *variant {
            CREATE_METADATA_ACCOUNT_V0 | UPDATE_METADATA_ACCOUNT_V0 => {
                Err(MetadataError::Removed.into())
            }
            _ => Err(ProgramError::InvalidInstructionData),
        },
    }?;

    match instruction {
        MetadataInstruction::CreateMetadataAccount(args) => {
            msg!("IX: Create Metadata Accounts");
            process_create_metadata_accounts(
                program_id,
                accounts,
                args.data,
                args.is_mutable,
                args.collection_details,
            )
        }
        MetadataInstruction::UpdateMetadataAccount(args) => {
            msg!("IX: Update Metadata Accounts");
            process_update_metadata_accounts(
                program_id,
                accounts,
                args.data,
                args.update_authority,
                args.primary_sale_happened,
                args.is_mutable,
            )
        }
    }
}

macro_rules! all_account_infos {
    ($accounts:expr, $($account:ident),*) => {
        let [$($account),*] = match $accounts {
            [$($account),*, ..] => [$($account),*],
            _ => return Err(solana_program::program_error::ProgramError::NotEnoughAccountKeys),
        };
    };
}

pub(crate) use all_account_infos;
