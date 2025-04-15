import { PublicKey } from '@bbachain/web3.js';
import * as borsh from 'borsh';
import { TokenMetadata } from './types';

// Classify for borsh.deserialize
class TokenMetadataBorsh {
    mint: Uint8Array;
    name: string;
    symbol: string;
    uri: string;
    authority: Uint8Array;

    constructor(props: any) {
        this.mint = props.mint;
        this.name = props.name;
        this.symbol = props.symbol;
        this.uri = props.uri;
        this.authority = props.authority;
    }
}

const METADATA_SCHEMA = new Map([
    [
        TokenMetadataBorsh,
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

export function deserializeMetadata(data: Buffer): TokenMetadata {
    const raw = borsh.deserialize(METADATA_SCHEMA, TokenMetadataBorsh, data);

    return {
        mint: new PublicKey(raw.mint),
        name: raw.name,
        symbol: raw.symbol,
        uri: raw.uri,
        authority: new PublicKey(raw.authority),
    };
}
