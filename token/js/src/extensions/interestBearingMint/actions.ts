import {
    ConfirmOptions,
    Connection,
    Keypair,
    PublicKey,
    sendAndConfirmTransaction,
    Signer,
    SystemProgram,
    Transaction,
} from '@bbachain/web3.js';
import { getSigners } from '../../actions/internal';
import { TOKEN_2022_PROGRAM_ID } from '../../constants';
import { createInitializeMintInstruction } from '../../instructions';
import { ExtensionType, getMintLen } from '../extensionType';
import {
    createInitializeInterestBearingMintInstruction,
    createUpdateRateInterestBearingMintInstruction,
} from './instructions';

/**
 * Initialize an interest bearing account on a mint
 *
 * @param connection      Connection to use
 * @param payer           Payer of the transaction fees
 * @param mintAuthority   Account or multisig that will control minting
 * @param freezeAuthority Optional account or multisig that can freeze token accounts
 * @param rateAuthority   The public key for the account that can update the rate
 * @param rate            The initial interest rate
 * @param decimals        Location of the decimal place
 * @param keypair         Optional keypair, defaulting to a new random one
 * @param confirmOptions  Options for confirming the transaction
 * @param programId       SPL Token program account
 *
 * @return Public key of the mint
 */
export async function createInterestBearingMint(
    connection: Connection,
    payer: Signer,
    mintAuthority: PublicKey,
    freezeAuthority: PublicKey,
    rateAuthority: PublicKey,
    rate: number,
    decimals: number,
    keypair = Keypair.generate(),
    confirmOptions?: ConfirmOptions,
    programId = TOKEN_2022_PROGRAM_ID
): Promise<PublicKey> {
    const mintLen = getMintLen([ExtensionType.InterestBearingMint]);
    const daltons = await connection.getMinimumBalanceForRentExemption(mintLen);
    const transaction = new Transaction().add(
        SystemProgram.createAccount({
            fromPubkey: payer.publicKey,
            newAccountPubkey: keypair.publicKey,
            space: mintLen,
            daltons,
            programId,
        }),
        createInitializeInterestBearingMintInstruction(keypair.publicKey, rateAuthority, rate, programId),
        createInitializeMintInstruction(keypair.publicKey, decimals, mintAuthority, freezeAuthority, programId)
    );
    await sendAndConfirmTransaction(connection, transaction, [payer, keypair], confirmOptions);
    return keypair.publicKey;
}

/**
 * Update the interest rate of an interest bearing account
 *
 * @param connection      Connection to use
 * @param payer           Payer of the transaction fees
 * @param mint            Public key of the mint
 * @param rateAuthority   The public key for the account that can update the rate
 * @param rate            The initial interest rate
 * @param multiSigners    Signing accounts if `owner` is a multisig
 * @param confirmOptions  Options for confirming the transaction
 * @param programId       SPL Token program account
 *
 * @return Signature of the confirmed transaction
 */
export async function updateRateInterestBearingMint(
    connection: Connection,
    payer: Signer,
    mint: PublicKey,
    rateAuthority: Signer,
    rate: number,
    multiSigners: Signer[] = [],
    confirmOptions?: ConfirmOptions,
    programId = TOKEN_2022_PROGRAM_ID
): Promise<string> {
    const [rateAuthorityPublicKey, signers] = getSigners(rateAuthority, multiSigners);
    const transaction = new Transaction().add(
        createUpdateRateInterestBearingMintInstruction(mint, rateAuthorityPublicKey, rate, signers, programId)
    );

    return await sendAndConfirmTransaction(connection, transaction, [payer, rateAuthority, ...signers], confirmOptions);
}
