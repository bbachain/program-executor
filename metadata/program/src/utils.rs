use solana_program::pubkey::Pubkey;

use crate::constants::METADATA_SEED;

pub fn derive_metadata_pda(mint: &Pubkey, program_id: &Pubkey) -> (Pubkey, u8) {
    Pubkey::find_program_address(&[METADATA_SEED, mint.as_ref()], program_id)
}
