/* eslint-disable @typescript-eslint/no-explicit-any */
// @bbachain/spl-token-metadata — TypeScript SDK (v0.1.0)
// --------------------------------------------------------------
//  * fetches / decodes on‑chain metadata safely
//  * builds Initialise / Update instructions
//  * no anchor / serializer runtime required – just `@solana/web3.js` + `borsh`
//  * FIX: decode now tolerates the extra 1‑byte padding that the Rust program
//    leaves at the tail of the account (root cause of the “Unexpected 1 bytes
//    after deserialized data” error)
// --------------------------------------------------------------

import { Connection, PublicKey, SystemProgram, TransactionInstruction } from '@bbachain/web3.js';
import { serialize, deserializeUnchecked, Schema } from 'borsh';

// ──────────────────────────────────────────────────────────────────────────────
// Constants
// ──────────────────────────────────────────────────────────────────────────────

export const PROGRAM_ID = new PublicKey('metaAig5QsCBSfstkwqPQxzdjXdUB8JxjfvtvEPNe3F');
const PDA_SEED = 'metadata';

export const MAX_NAME_LEN = 32;
export const MAX_SYMBOL_LEN = 10;
export const MAX_URI_LEN = 200;

/**
 * The on‑chain contract allocates `+1` extra byte when the account is
 * created (see `processor.rs::data_size`) but never writes to it.  When a
 * strict Borsh deserializer parses the raw buffer it therefore complains about
 * a single trailing byte, hence the runtime error the user encountered.  We
 * handle this by deserialising *unchecked* (which ignores the tail) and, as a
 * belt‑and‑braces measure, falling back to slicing off that final padding byte
 * if the unchecked path ever failed for another reason.
 */
const TAIL_PADDING = 1;

// ──────────────────────────────────────────────────────────────────────────────
// Borsh schemas
// ──────────────────────────────────────────────────────────────────────────────

export class InitializeArgs {
    name!: string;
    symbol!: string;
    uri!: string;
    constructor(args: InitializeArgs) {
        Object.assign(this, args);
    }
}

export class UpdateArgs {
    name!: string;
    symbol!: string;
    uri!: string;
    constructor(args: UpdateArgs) {
        Object.assign(this, args);
    }
}

export class TokenMetadata {
    mint!: Uint8Array; // Pubkey – 32 bytes
    name!: string;
    symbol!: string;
    uri!: string;
    authority!: Uint8Array; // Pubkey – 32 bytes
    constructor(args: TokenMetadata) {
        Object.assign(this, args);
    }
}

const STATE_SCHEMA: Schema = new Map<any, any>([
    [
        TokenMetadata,
        {
            kind: 'struct',
            fields: [
                ['mint', [32]],
                ['name', 'string'],
                ['symbol', 'string'],
                ['uri', 'string'],
                ['authority', [32]],
            ],
        },
    ],
]);

const INSTRUCTION_SCHEMA: Schema = new Map<any, any>([
    [
        InitializeArgs,
        {
            kind: 'struct',
            fields: [
                ['name', 'string'],
                ['symbol', 'string'],
                ['uri', 'string'],
            ],
        },
    ],
    [
        UpdateArgs,
        {
            kind: 'struct',
            fields: [
                ['name', 'string'],
                ['symbol', 'string'],
                ['uri', 'string'],
            ],
        },
    ],
]);

// ──────────────────────────────────────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────────────────────────────────────

export enum TokenInstructionKind {
    Initialize = 0,
    Update = 1,
}

export const deriveMetadataPDA = (mint: PublicKey): [PublicKey, number] =>
    PublicKey.findProgramAddressSync([Buffer.from(PDA_SEED), mint.toBuffer()], PROGRAM_ID);

function encodeInstructionData(kind: TokenInstructionKind, args: InitializeArgs | UpdateArgs): Buffer {
    const payload = serialize(INSTRUCTION_SCHEMA, args);
    return Buffer.concat([Buffer.from([kind]), Buffer.from(payload)]);
}

function assertFieldLengths(args: { name: string; symbol: string; uri: string }) {
    if (args.name.length > MAX_NAME_LEN) throw new Error('name too long');
    if (args.symbol.length > MAX_SYMBOL_LEN) throw new Error('symbol too long');
    if (args.uri.length > MAX_URI_LEN) throw new Error('uri too long');
}

// ──────────────────────────────────────────────────────────────────────────────
// Instruction builders
// ──────────────────────────────────────────────────────────────────────────────

export const createInitializeMetadataIx = (
    payer: PublicKey,
    mint: PublicKey,
    args: InitializeArgs
): TransactionInstruction => {
    assertFieldLengths(args);

    const [metadataPda] = deriveMetadataPDA(mint);
    const keys = [
        { pubkey: metadataPda, isSigner: false, isWritable: true },
        { pubkey: mint, isSigner: false, isWritable: false },
        { pubkey: payer, isSigner: true, isWritable: true },
        { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
    ];
    const data = encodeInstructionData(TokenInstructionKind.Initialize, args);
    return new TransactionInstruction({ programId: PROGRAM_ID, keys, data });
};

export const createUpdateMetadataIx = (
    authority: PublicKey,
    mint: PublicKey,
    args: UpdateArgs
): TransactionInstruction => {
    assertFieldLengths(args);

    const [metadataPda] = deriveMetadataPDA(mint);
    const keys = [
        { pubkey: metadataPda, isSigner: false, isWritable: true },
        { pubkey: mint, isSigner: false, isWritable: false },
        { pubkey: authority, isSigner: true, isWritable: false },
    ];
    const data = encodeInstructionData(TokenInstructionKind.Update, args);
    return new TransactionInstruction({ programId: PROGRAM_ID, keys, data });
};

// ──────────────────────────────────────────────────────────────────────────────
// Read helpers
// ──────────────────────────────────────────────────────────────────────────────

export const decodeMetadataAccount = (data: Buffer): TokenMetadata => {
    // first, a forgiving attempt that ignores any trailing bytes
    try {
        return deserializeUnchecked(STATE_SCHEMA, TokenMetadata, data);
    } catch (e: any) {
        // second chance: slice off the occasional 1‑byte tail padding
        if (data.length > 0) {
            return deserializeUnchecked(STATE_SCHEMA, TokenMetadata, data.subarray(0, data.length - TAIL_PADDING));
        }
        throw e;
    }
};

export const fetchMetadata = async (connection: Connection, mint: PublicKey): Promise<TokenMetadata | null> => {
    const [metadataPda] = deriveMetadataPDA(mint);
    const info = await connection.getAccountInfo(metadataPda);
    return info ? decodeMetadataAccount(info.data) : null;
};
