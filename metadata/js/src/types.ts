/** Discriminant used on‑chain for the instruction enum. */
export enum TokenInstructionKind {
    Initialize = 0,
    Update = 1,
}

/** Args for the `Initialize` instruction. */
export class InitializeArgs {
    name!: string;
    symbol!: string;
    uri!: string;
    constructor(props: InitializeArgs) {
        Object.assign(this, props);
    }
}

/** Args for the `Update` instruction. */
export class UpdateArgs {
    name!: string;
    symbol!: string;
    uri!: string;
    constructor(props: UpdateArgs) {
        Object.assign(this, props);
    }
}

/** Layout of the on‑chain account. */
export class TokenMetadata {
    mint!: Uint8Array; // 32‑byte pubkey
    name!: string;
    symbol!: string;
    uri!: string;
    authority!: Uint8Array; // 32‑byte pubkey
    constructor(props: TokenMetadata) {
        Object.assign(this, props);
    }
}
