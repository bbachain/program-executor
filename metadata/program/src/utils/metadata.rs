use solana_program::{
    account_info::AccountInfo, entrypoint::ProgramResult, program_option::COption, pubkey::Pubkey,
};
use spl_utils::{
    create_or_allocate_account_raw,
    token::{get_mint_authority, SPL_TOKEN_PROGRAM_IDS},
};

use crate::{
    assertions::{assert_mint_authority_matches_mint, assert_owner_in},
    error::MetadataError,
    state::{CollectionDetails, Data, Metadata, TokenStandard, MAX_METADATA_LEN, PREFIX},
};

// This equals the program address of the metadata program:
//
// AqH29mZfQFgRpfwaPoTMWSKJ5kqauoc1FwVBRksZyQrt
//
// IMPORTANT NOTE
// This allows the upgrade authority of the Token Metadata program to create metadata for SPL tokens.
// This only allows the upgrade authority to do create general metadata for the SPL token, it does not
// allow the upgrade authority to add or change creators.
pub const SEED_AUTHORITY: Pubkey = Pubkey::new_from_array([
    0x92, 0x17, 0x2c, 0xc4, 0x72, 0x5d, 0xc0, 0x41, 0xf9, 0xdd, 0x8c, 0x51, 0x52, 0x60, 0x04, 0x26,
    0x00, 0x93, 0xa3, 0x0b, 0x02, 0x73, 0xdc, 0xfa, 0x74, 0x92, 0x17, 0xfc, 0x94, 0xa2, 0x40, 0x49,
]);

pub struct CreateMetadataAccountsLogicArgs<'a> {
    pub metadata_account_info: &'a AccountInfo<'a>,
    pub mint_info: &'a AccountInfo<'a>,
    pub mint_authority_info: &'a AccountInfo<'a>,
    pub payer_account_info: &'a AccountInfo<'a>,
    pub update_authority_info: &'a AccountInfo<'a>,
    pub system_account_info: &'a AccountInfo<'a>,
}

#[allow(clippy::too_many_arguments)]
/// Create a new account instruction
#[allow(clippy::too_many_arguments)]
pub fn process_create_metadata_accounts_logic(
    program_id: &Pubkey,
    accounts: CreateMetadataAccountsLogicArgs,
    data: Data,
    allow_direct_creator_writes: bool,
    mut is_mutable: bool,
    add_token_standard: bool,
    collection_details: Option<CollectionDetails>,
    token_standard_override: Option<TokenStandard>,
) -> ProgramResult {
    let CreateMetadataAccountsLogicArgs {
        metadata_account_info,
        mint_info,
        mint_authority_info,
        payer_account_info,
        update_authority_info,
        system_account_info,
    } = accounts;

    let mut update_authority_key = *update_authority_info.key;
    let existing_mint_authority = get_mint_authority(mint_info)?;

    // IMPORTANT NOTE:
    // This allows SPL Token Metadata to Create but not update metadata for SPL tokens that
    // have not populated their metadata.
    assert_mint_authority_matches_mint(&existing_mint_authority, mint_authority_info).or_else(
        |e| {
            // Allow seeding by the authority seed populator
            if mint_authority_info.key == &SEED_AUTHORITY && mint_authority_info.is_signer {
                // When metadata is seeded, the mint authority should be able to change it
                if let COption::Some(auth) = existing_mint_authority {
                    update_authority_key = auth;
                    is_mutable = true;
                }
                Ok(())
            } else {
                Err(e)
            }
        },
    )?;
    assert_owner_in(mint_info, &SPL_TOKEN_PROGRAM_IDS)?;

    let metadata_seeds = &[
        PREFIX.as_bytes(),
        program_id.as_ref(),
        mint_info.key.as_ref(),
    ];
    let (metadata_key, metadata_bump_seed) =
        Pubkey::find_program_address(metadata_seeds, program_id);
    let metadata_authority_signer_seeds = &[
        PREFIX.as_bytes(),
        program_id.as_ref(),
        mint_info.key.as_ref(),
        &[metadata_bump_seed],
    ];

    if metadata_account_info.key != &metadata_key {
        return Err(MetadataError::InvalidMetadataKey.into());
    }

    create_or_allocate_account_raw(
        *program_id,
        metadata_account_info,
        system_account_info,
        payer_account_info,
        MAX_METADATA_LEN,
        metadata_authority_signer_seeds,
    )?;

    // TODO:

    Ok(())
}
