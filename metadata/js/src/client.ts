import {
    Connection,
    PublicKey,
    TransactionInstruction,
    SystemProgram,
    Transaction,
    sendAndConfirmTransaction,
    Signer,
} from '@bbachain/web3.js';
import { METADATA_SEED, PROGRAM_ID } from './constants';
import { deserializeMetadata } from './deserialize';
import { encodeInitializeInstruction, encodeUpdateInstruction } from './instructions';
import { TokenMetadata } from './types';

export async function getMetadataPDA(mint: PublicKey): Promise<[PublicKey, number]> {
    return await PublicKey.findProgramAddress([Buffer.from(METADATA_SEED), mint.toBuffer()], PROGRAM_ID);
}

export async function initializeMetadata(
    connection: Connection,
    payer: Signer,
    mint: PublicKey,
    name: string,
    symbol: string,
    uri: string
) {
    const [metadataPDA, bump] = await getMetadataPDA(mint);

    const ix = new TransactionInstruction({
        programId: PROGRAM_ID,
        keys: [
            { pubkey: metadataPDA, isSigner: false, isWritable: true },
            { pubkey: mint, isSigner: false, isWritable: false },
            { pubkey: payer.publicKey, isSigner: true, isWritable: true },
            { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
        ],
        data: encodeInitializeInstruction(name, symbol, uri),
    });

    const tx = new Transaction().add(ix);
    return await sendAndConfirmTransaction(connection, tx, [payer]);
}

export async function updateMetadata(
    connection: Connection,
    payer: Signer,
    mint: PublicKey,
    name: string,
    symbol: string,
    uri: string
) {
    const [metadataPDA, _] = await getMetadataPDA(mint);

    const ix = new TransactionInstruction({
        programId: PROGRAM_ID,
        keys: [
            { pubkey: metadataPDA, isSigner: false, isWritable: true },
            { pubkey: mint, isSigner: false, isWritable: false },
            { pubkey: payer.publicKey, isSigner: true, isWritable: false },
        ],
        data: encodeUpdateInstruction(name, symbol, uri),
    });

    const tx = new Transaction().add(ix);
    return await sendAndConfirmTransaction(connection, tx, [payer]);
}

export async function readMetadata(connection: Connection, mint: PublicKey): Promise<TokenMetadata | null> {
    const [metadataPDA] = await getMetadataPDA(mint);
    const accountInfo = await connection.getAccountInfo(metadataPDA);

    if (!accountInfo) return null;

    return deserializeMetadata(accountInfo.data);
}
