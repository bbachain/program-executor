use solana_program::{
    account_info::AccountInfo, entrypoint::ProgramResult, program_option::COption, pubkey::Pubkey,
};
use spl_utils::cmp_pubkeys;

use crate::error::MetadataError;

pub fn assert_mint_authority_matches_mint(
    mint_authority: &COption<Pubkey>,
    mint_authority_info: &AccountInfo,
) -> ProgramResult {
    match mint_authority {
        COption::None => {
            return Err(MetadataError::InvalidMintAuthority.into());
        }
        COption::Some(key) => {
            if mint_authority_info.key != key {
                return Err(MetadataError::InvalidMintAuthority.into());
            }
        }
    }

    if !mint_authority_info.is_signer {
        return Err(MetadataError::NotMintAuthority.into());
    }

    Ok(())
}

pub fn assert_owner_in(account: &AccountInfo, owners: &[Pubkey]) -> ProgramResult {
    if owners.iter().any(|owner| cmp_pubkeys(owner, account.owner)) {
        Ok(())
    } else {
        Err(MetadataError::IncorrectOwner.into())
    }
}

pub fn assert_owned_by(account: &AccountInfo, owner: &Pubkey) -> ProgramResult {
    spl_utils::assert_owned_by(account, owner, MetadataError::IncorrectOwner)
}
