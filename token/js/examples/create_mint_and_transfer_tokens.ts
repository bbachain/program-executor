import { BBA_DALTON_UNIT, clusterApiUrl, Connection, Keypair } from '@bbachain/web3.js';
import { createMint, getOrCreateAssociatedTokenAccount, mintTo, transfer } from '../src'; // @FIXME: replace with @bbachain/spl-token

(async () => {
    // Connect to cluster
    const connection = new Connection(clusterApiUrl('testnet'), 'confirmed');

    // Generate a new wallet keypair and airdrop BBA
    const fromWallet = Keypair.generate();
    const fromAirdropSignature = await connection.requestAirdrop(fromWallet.publicKey, BBA_DALTON_UNIT);

    // Wait for airdrop confirmation
    await connection.confirmTransaction(fromAirdropSignature);

    // Generate a new wallet to receive newly minted token
    const toWallet = Keypair.generate();

    // Create new token mint
    const mint = await createMint(connection, fromWallet, fromWallet.publicKey, null, 9);

    // Get the token account of the fromWallet address, and if it does not exist, create it
    const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        fromWallet,
        mint,
        fromWallet.publicKey
    );

    // Get the token account of the toWallet address, and if it does not exist, create it
    const toTokenAccount = await getOrCreateAssociatedTokenAccount(connection, fromWallet, mint, toWallet.publicKey);

    // Mint 1 new token to the "fromTokenAccount" account we just created
    let signature = await mintTo(
        connection,
        fromWallet,
        mint,
        fromTokenAccount.address,
        fromWallet.publicKey,
        1000000000,
        []
    );
    console.log('mint tx:', signature);

    // Transfer the new token to the "toTokenAccount" we just created
    signature = await transfer(
        connection,
        fromWallet,
        fromTokenAccount.address,
        toTokenAccount.address,
        fromWallet.publicKey,
        1000000000,
        []
    );
    console.log('transfer tx:', signature);
})();
