use solana_program::{account_info::AccountInfo, entrypoint::ProgramResult, pubkey::Pubkey};

use crate::state::Data;

// Update existing account instruction
pub fn process_update_metadata_accounts(
    _program_id: &Pubkey,
    _accounts: &[AccountInfo],
    _optional_data: Option<Data>,
    _update_authority: Option<Pubkey>,
    _primary_sale_happened: Option<bool>,
    _is_mutable: Option<bool>,
) -> ProgramResult {
    todo!("process_update_metadata_accounts");
}
