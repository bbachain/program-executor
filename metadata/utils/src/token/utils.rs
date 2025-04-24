use arrayref::{array_ref, array_refs};
use solana_program::{
    account_info::AccountInfo, program_error::ProgramError, program_option::COption, pubkey::Pubkey,
};

pub fn get_mint_authority(account_info: &AccountInfo) -> Result<COption<Pubkey>, ProgramError> {
    // In token program, 36, 8, 1, 1 is the layout, where the first 36 is mint_authority
    // so we start at 0.
    let data = account_info.try_borrow_data().unwrap();
    let authority_bytes = array_ref![data, 0, 36];

    unpack_coption_key(authority_bytes)
}

/// Unpacks COption from a slice, taken from token program
fn unpack_coption_key(src: &[u8; 36]) -> Result<COption<Pubkey>, ProgramError> {
    let (tag, body) = array_refs![src, 4, 32];
    match *tag {
        [0, 0, 0, 0] => Ok(COption::None),
        [1, 0, 0, 0] => Ok(COption::Some(Pubkey::new_from_array(*body))),
        _ => Err(ProgramError::InvalidAccountData),
    }
}

/// cheap method to just get supply off a mint without unpacking whole object
pub fn get_mint_decimals(account_info: &AccountInfo) -> Result<u8, ProgramError> {
    // In token program, 36, 8, 1, 1, is the layout, where the first 1 is decimals u8.
    // so we start at 36.
    let data = account_info.try_borrow_data()?;

    // If we don't check this and an empty account is passed in, we get a panic when
    // we try to index into the data.
    if data.is_empty() {
        return Err(ProgramError::InvalidAccountData);
    }

    Ok(data[44])
}
