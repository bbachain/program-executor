import { PublicKey, Keypair, Connection, Signer } from '@bbachain/web3.js';
import { PROGRAM_ID } from '../src';

export async function getConnection(): Promise<Connection> {
    const url = 'http://localhost:8899';
    const connection = new Connection(url, 'confirmed');
    await connection.getVersion();
    return connection;
}

export const TEST_PROGRAM_ID = process.env.TEST_PROGRAM_ID
    ? new PublicKey(process.env.TEST_PROGRAM_ID)
    : PROGRAM_ID;
