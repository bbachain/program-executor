use solana_program::{program_error::ProgramError, rent::Rent, sysvar::Sysvar};

use crate::error::MetadataError;

const CREATE_FEE_SCALAR: usize = 1308;
const CREATE_FEE_OFFSET: u64 = 5440;
// create_metadata_accounts, create, print edition commands
pub fn get_create_fee() -> Result<u64, ProgramError> {
    let rent = Rent::get()?.minimum_balance(CREATE_FEE_SCALAR);

    Ok(rent
        .checked_add(CREATE_FEE_OFFSET)
        .ok_or(MetadataError::NumericalOverflowError)?)
}

pub const FEE_FLAG_SET: u8 = 1;
pub const FEE_FLAG_CLEARED: u8 = 0;
