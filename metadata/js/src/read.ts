import { Connection, PublicKey } from '@bbachain/web3.js';
import { deserializeUnchecked } from 'borsh';
import { STATE_SCHEMA } from './schema';
import { TokenMetadata } from './types';
import { deriveMetadataPDA } from './helpers';
import { TAIL_PADDING } from './constants';

/** Deserialises raw account data → `TokenMetadata`, forgiving the 1‑byte tail. */
export const decodeMetadataAccount = (data: Buffer): TokenMetadata => {
    try {
        return deserializeUnchecked(STATE_SCHEMA, TokenMetadata, data);
    } catch {
        if (data.length > TAIL_PADDING) {
            return deserializeUnchecked(STATE_SCHEMA, TokenMetadata, data.subarray(0, data.length - TAIL_PADDING));
        }
        throw new Error('Failed to decode TokenMetadata');
    }
};

/** Fetches & decodes the account; returns `null` if it doesn’t exist. */
export const fetchMetadata = async (connection: Connection, mint: PublicKey): Promise<TokenMetadata | null> => {
    const [pda] = deriveMetadataPDA(mint);
    const info = await connection.getAccountInfo(pda);
    return info ? decodeMetadataAccount(info.data) : null;
};
