import * as borsh from 'borsh';

class InitializeInstruction {
    instruction = 0;
    name: string;
    symbol: string;
    uri: string;

    constructor(props: { name: string; symbol: string; uri: string }) {
        this.name = props.name;
        this.symbol = props.symbol;
        this.uri = props.uri;
    }
}

class UpdateInstruction {
    instruction = 1;
    name: string;
    symbol: string;
    uri: string;

    constructor(props: { name: string; symbol: string; uri: string }) {
        this.name = props.name;
        this.symbol = props.symbol;
        this.uri = props.uri;
    }
}

const InstructionSchema = new Map<any, any>([
    [
        InitializeInstruction,
        {
            kind: 'struct',
            fields: [
                ['instruction', 'u8'],
                ['name', 'string'],
                ['symbol', 'string'],
                ['uri', 'string'],
            ],
        },
    ],
    [
        UpdateInstruction,
        {
            kind: 'struct',
            fields: [
                ['instruction', 'u8'],
                ['name', 'string'],
                ['symbol', 'string'],
                ['uri', 'string'],
            ],
        },
    ],
]);

export function encodeInitializeInstruction(name: string, symbol: string, uri: string): Buffer {
    return Buffer.from(borsh.serialize(InstructionSchema, new InitializeInstruction({ name, symbol, uri })));
}

export function encodeUpdateInstruction(name: string, symbol: string, uri: string): Buffer {
    return Buffer.from(borsh.serialize(InstructionSchema, new UpdateInstruction({ name, symbol, uri })));
}
