use borsh::{maybestd::io::Error as BorshError, BorshDeserialize};
use solana_program::{account_info::AccountInfo, entrypoint::ProgramResult, pubkey::Pubkey};
use spl_utils::{
    create_or_allocate_account_raw,
    token::{get_mint_authority, SPL_TOKEN_PROGRAM_IDS},
};

use super::*;
use crate::{
    assertions::{
        assert_mint_authority_matches_mint, assert_owner_in,
        collection::assert_collection_update_is_valid, metadata::assert_data_valid,
        uses::assert_valid_use,
    },
    state::{
        Collection, CollectionDetails, Data, Key, Metadata, TokenStandard, Uses, MAX_METADATA_LEN,
        METADATA_FEE_FLAG_OFFSET, PREFIX,
    },
};

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
    is_mutable: bool,
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

    let update_authority_key = *update_authority_info.key;
    let existing_mint_authority = get_mint_authority(mint_info)?;

    assert_mint_authority_matches_mint(&existing_mint_authority, mint_authority_info)?;
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

    let mut metadata = Metadata::from_account_info(metadata_account_info)?;

    assert_data_valid(
        &data,
        &update_authority_key,
        &metadata,
        allow_direct_creator_writes,
        update_authority_info.is_signer,
    )?;

    // DISABLED: This is a security risk.
    // let mint_decimals = get_mint_decimals(mint_info)?;

    metadata.mint = *mint_info.key;
    metadata.key = Key::Metadata;
    metadata.data = data.clone();
    metadata.is_mutable = is_mutable;
    metadata.update_authority = update_authority_key;

    assert_valid_use(&data.uses, &None)?;
    metadata.uses = data.uses;

    assert_collection_update_is_valid(&None, &data.collection)?;
    metadata.collection = data.collection;

    // We want to create new collections with a size of zero but we use the
    // collection details enum for forward compatibility.
    if let Some(details) = collection_details {
        match details {
            #[allow(deprecated)]
            CollectionDetails::V1 { size: _size } => {
                metadata.collection_details = Some(CollectionDetails::V1 { size: 0 });
            }
            CollectionDetails::V2 { padding: _ } => {
                metadata.collection_details = Some(CollectionDetails::V2 { padding: [0; 8] });
            }
        }
    } else {
        metadata.collection_details = None;
    }

    metadata.token_standard = if add_token_standard {
        token_standard_override.or(Some(TokenStandard::Fungible))
    } else {
        None
    };

    puff_out_data_fields(&mut metadata);

    // saves the changes to the account data
    metadata.save(&mut metadata_account_info.data.borrow_mut())?;

    Ok(())
}

// Custom deserialization function to handle NFTs with corrupted data.
// This function is used in a custom deserialization implementation for the
// `Metadata` struct, so should never have `msg` macros used in it as it may be used client side
// either in tests or client code.
//
// It does not check `Key` type or account length and should only be used through the custom functions
// `from_account_info` and `deserialize` implemented on the Metadata struct.
pub fn meta_deser_unchecked(buf: &mut &[u8]) -> Result<Metadata, BorshError> {
    let key: Key = BorshDeserialize::deserialize(buf)?;
    let update_authority: Pubkey = BorshDeserialize::deserialize(buf)?;
    let mint: Pubkey = BorshDeserialize::deserialize(buf)?;
    let data: Data = BorshDeserialize::deserialize(buf)?;
    let primary_sale_happened: bool = BorshDeserialize::deserialize(buf)?;
    let is_mutable: bool = BorshDeserialize::deserialize(buf)?;

    let token_standard_res: Result<Option<TokenStandard>, BorshError> =
        BorshDeserialize::deserialize(buf);
    let collection_res: Result<Option<Collection>, BorshError> = BorshDeserialize::deserialize(buf);
    let uses_res: Result<Option<Uses>, BorshError> = BorshDeserialize::deserialize(buf);

    let collection_details_res: Result<Option<CollectionDetails>, BorshError> =
        BorshDeserialize::deserialize(buf);

    // We can have accidentally valid, but corrupted data, particularly on the Collection struct,
    // so to increase probability of catching errors. If any of these deserializations fail, set
    // all values to None.
    let (token_standard, collection, uses) = match (token_standard_res, collection_res, uses_res) {
        (Ok(token_standard_res), Ok(collection_res), Ok(uses_res)) => {
            (token_standard_res, collection_res, uses_res)
        }
        _ => (None, None, None),
    };

    let collection_details = match collection_details_res {
        Ok(details) => details,
        Err(_) => None,
    };

    let metadata = Metadata {
        key,
        update_authority,
        mint,
        data,
        primary_sale_happened,
        is_mutable,
        token_standard,
        collection,
        collection_details,
        uses,
    };

    Ok(metadata)
}

pub fn clean_write_metadata(
    metadata: &mut Metadata,
    metadata_account_info: &AccountInfo,
) -> ProgramResult {
    let end = metadata_account_info
        .data_len()
        .checked_sub(METADATA_FEE_FLAG_OFFSET)
        .ok_or(MetadataError::NumericalOverflowError)?;
    // Clear all data to ensure it is serialized cleanly with no trailing data due to creators array resizing.
    let mut metadata_account_info_data = metadata_account_info.try_borrow_mut_data()?;
    // Don't overwrite fee flag.
    metadata_account_info_data[0..end].fill(0);

    metadata.save(&mut metadata_account_info_data)?;
    Ok(())
}
