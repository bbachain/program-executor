import { PublicKey } from '@bbachain/web3.js';
import { serialize } from 'borsh';
import { PROGRAM_ID, PDA_SEED, MAX_NAME_LEN, MAX_SYMBOL_LEN, MAX_URI_LEN } from './constants';
import { InitializeArgs, UpdateArgs, TokenInstructionKind } from './types';
import { INSTRUCTION_SCHEMA } from './schema';

/** PDA derivation helper (sync, because web3.js v2). */
export const deriveMetadataPDA = (mint: PublicKey): [PublicKey, number] =>
    PublicKey.findProgramAddressSync([Buffer.from(PDA_SEED), mint.toBuffer()], PROGRAM_ID);

/** Length guards (throws early on oversized strings). */
export function assertFieldLengths(obj: { name: string; symbol: string; uri: string }): void {
    if (obj.name.length > MAX_NAME_LEN) throw new Error('name too long');
    if (obj.symbol.length > MAX_SYMBOL_LEN) throw new Error('symbol too long');
    if (obj.uri.length > MAX_URI_LEN) throw new Error('uri too long');
}

/** Prepends the enum discriminant to a Borsh‑encoded payload. */
export function encodeInstructionData(kind: TokenInstructionKind, args: InitializeArgs | UpdateArgs): Buffer {
    const data = serialize(INSTRUCTION_SCHEMA, args);
    return Buffer.concat([Buffer.from([kind]), data]);
}
