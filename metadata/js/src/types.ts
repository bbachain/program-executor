import { PublicKey } from '@bbachain/web3.js';

export type TokenMetadata = {
    mint: PublicKey;
    name: string;
    symbol: string;
    uri: string;
    authority: PublicKey;
};

export type InitializeArgs = {
    name: string;
    symbol: string;
    uri: string;
};
