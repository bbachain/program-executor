import { PublicKey } from '@bbachain/web3.js';

/** Program ID (replace with your actual address if it changes). */
export const PROGRAM_ID = new PublicKey('metaAig5QsCBSfstkwqPQxzdjXdUB8JxjfvtvEPNe3F');

export const PDA_SEED = 'metadata';

/** Maximum on‑chain string lengths (bytes, not UTF‑16 code units). */
export const MAX_NAME_LEN = 32;
export const MAX_SYMBOL_LEN = 10;
export const MAX_URI_LEN = 200;

/**
 * The Rust program over‑allocates one byte when it creates the account
 * (`processor.rs::data_size`), but never writes to it.
 * We drop that trailing byte when decoding.
 */
export const TAIL_PADDING = 1;
