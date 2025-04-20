import { PublicKey, SystemProgram, TransactionInstruction } from '@bbachain/web3.js';
import { InitializeArgs, UpdateArgs, TokenInstructionKind } from './types';
import { PROGRAM_ID } from './constants';
import { assertFieldLengths, deriveMetadataPDA, encodeInstructionData } from './helpers';

/** Builds an `Initialize` instruction. */
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

/** Builds an `Update` instruction. */
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
