use solana_program::{program_error::ProgramError, pubkey::Pubkey};

pub fn derive_metadata_pda(mint: &Pubkey, program_id: &Pubkey) -> (Pubkey, u8) {
    Pubkey::find_program_address(&[b"metadata", mint.as_ref()], program_id)
}
