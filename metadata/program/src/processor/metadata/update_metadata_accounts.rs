use solana_program::{account_info::AccountInfo, entrypoint::ProgramResult, pubkey::Pubkey};

use crate::{error::MetadataError, processor::all_account_infos, state::Data};

// Update existing account instruction
pub fn process_update_metadata_accounts(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    optional_data: Option<Data>,
    update_authority: Option<Pubkey>,
    primary_sale_happened: Option<bool>,
    is_mutable: Option<bool>,
) -> ProgramResult {
    todo!("process_update_metadata_accounts");
}
