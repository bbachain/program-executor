use solana_program::{
    account_info::AccountInfo, entrypoint::ProgramResult, program_error::ProgramError, pubkey,
    pubkey::Pubkey,
};

pub static SPL_TOKEN_PROGRAM_IDS: [Pubkey; 2] = [
    pubkey!("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"),
    pubkey!("TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"),
];
