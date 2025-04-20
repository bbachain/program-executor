import { Schema } from 'borsh';
import { InitializeArgs, UpdateArgs, TokenMetadata } from './types';

/** Borsh schema for account state. */
export const STATE_SCHEMA: Schema = new Map([
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

/** Borsh schema for instruction payloads. */
export const INSTRUCTION_SCHEMA: Schema = new Map([
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
