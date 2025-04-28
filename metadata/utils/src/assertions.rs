use solana_program::{
    account_info::AccountInfo, entrypoint::ProgramResult, program_error::ProgramError,
    pubkey::Pubkey,
};

// use crate::cmp_pubkeys;

pub fn assert_owned_by(
    account: &AccountInfo,
    owner: &Pubkey,
    error: impl Into<ProgramError>,
) -> ProgramResult {
    if account.owner != owner {
        Err(error.into())
    } else {
        Ok(())
    }
}
