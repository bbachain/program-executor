use solana_program::{account_info::AccountInfo, entrypoint::ProgramResult, pubkey::Pubkey};

use crate::{
    processor::all_account_infos,
    state::{CollectionDetails, Data},
};

pub fn process_create_metadata_accounts<'a>(
    program_id: &'a Pubkey,
    accounts: &'a [AccountInfo<'a>],
    data: Data,
    is_mutable: bool,
    collection_details: Option<CollectionDetails>,
) -> ProgramResult {
    all_account_infos!(
        accounts,
        metadata_account_info,
        mint_info,
        mint_authority_info,
        payer_account_info,
        update_authority_info,
        system_account_info
    );

    todo!("process_create_metadata_accounts");
}
