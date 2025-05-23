import { struct, u32, u8 } from '@bbachain/buffer-layout';
import { bool, publicKey, u64 } from '@bbachain/buffer-layout-utils';
import { Commitment, Connection, PublicKey } from '@bbachain/web3.js';
import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID } from '../constants';
import {
    TokenAccountNotFoundError,
    TokenInvalidAccountOwnerError,
    TokenInvalidAccountSizeError,
    TokenInvalidMintError,
    TokenOwnerOffCurveError,
} from '../errors';
import { ACCOUNT_SIZE } from './account';
import { MULTISIG_SIZE } from './multisig';
import { AccountType, ACCOUNT_TYPE_SIZE } from '../extensions/accountType';
import { ExtensionType, getMintLen } from '../extensions/extensionType';

/** Information about a mint */
export interface Mint {
    /** Address of the mint */
    address: PublicKey;
    /**
     * Optional authority used to mint new tokens. The mint authority may only be provided during mint creation.
     * If no mint authority is present then the mint has a fixed supply and no further tokens may be minted.
     */
    mintAuthority: PublicKey | null;
    /** Total supply of tokens */
    supply: bigint;
    /** Number of base 10 digits to the right of the decimal place */
    decimals: number;
    /** Is this mint initialized */
    isInitialized: boolean;
    /** Optional authority to freeze token accounts */
    freezeAuthority: PublicKey | null;
    /** Additional data for extension */
    tlvData: Buffer;
}

/** Mint as stored by the program */
export interface RawMint {
    mintAuthorityOption: 1 | 0;
    mintAuthority: PublicKey;
    supply: bigint;
    decimals: number;
    isInitialized: boolean;
    freezeAuthorityOption: 1 | 0;
    freezeAuthority: PublicKey;
}

/** Buffer layout for de/serializing a mint */
export const MintLayout = struct<RawMint>([
    u32('mintAuthorityOption'),
    publicKey('mintAuthority'),
    u64('supply'),
    u8('decimals'),
    bool('isInitialized'),
    u32('freezeAuthorityOption'),
    publicKey('freezeAuthority'),
]);

/** Byte length of a mint */
export const MINT_SIZE = MintLayout.span;

/**
 * Retrieve information about a mint
 *
 * @param connection Connection to use
 * @param address    Mint account
 * @param commitment Desired level of commitment for querying the state
 * @param programId  SPL Token program account
 *
 * @return Mint information
 */
export async function getMint(
    connection: Connection,
    address: PublicKey,
    commitment?: Commitment,
    programId = TOKEN_PROGRAM_ID
): Promise<Mint> {
    const info = await connection.getAccountInfo(address, commitment);
    if (!info) throw new TokenAccountNotFoundError();
    if (!info.owner.equals(programId)) throw new TokenInvalidAccountOwnerError();
    if (info.data.length < MINT_SIZE) throw new TokenInvalidAccountSizeError();

    const rawMint = MintLayout.decode(info.data.slice(0, MINT_SIZE));
    let tlvData = Buffer.alloc(0);
    if (info.data.length > MINT_SIZE) {
        if (info.data.length <= ACCOUNT_SIZE) throw new TokenInvalidAccountSizeError();
        if (info.data.length === MULTISIG_SIZE) throw new TokenInvalidAccountSizeError();
        if (info.data[ACCOUNT_SIZE] != AccountType.Mint) throw new TokenInvalidMintError();
        tlvData = info.data.slice(ACCOUNT_SIZE + ACCOUNT_TYPE_SIZE);
    }

    return {
        address,
        mintAuthority: rawMint.mintAuthorityOption ? rawMint.mintAuthority : null,
        supply: rawMint.supply,
        decimals: rawMint.decimals,
        isInitialized: rawMint.isInitialized,
        freezeAuthority: rawMint.freezeAuthorityOption ? rawMint.freezeAuthority : null,
        tlvData,
    };
}

/** Get the minimum dalton balance for a mint to be rent exempt
 *
 * @param connection Connection to use
 * @param commitment Desired level of commitment for querying the state
 *
 * @return Amount of daltons required
 */
export async function getMinimumBalanceForRentExemptMint(
    connection: Connection,
    commitment?: Commitment
): Promise<number> {
    return await getMinimumBalanceForRentExemptMintWithExtensions(connection, [], commitment);
}

/** Get the minimum dalton balance for a rent-exempt mint with extensions
 *
 * @param connection Connection to use
 * @param extensions Extension types included in the mint
 * @param commitment Desired level of commitment for querying the state
 *
 * @return Amount of daltons required
 */
export async function getMinimumBalanceForRentExemptMintWithExtensions(
    connection: Connection,
    extensions: ExtensionType[],
    commitment?: Commitment
): Promise<number> {
    const mintLen = getMintLen(extensions);
    return await connection.getMinimumBalanceForRentExemption(mintLen, commitment);
}

/**
 * Async version of getAssociatedTokenAddressSync
 * For backwards compatibility
 *
 * @param mint                     Token mint account
 * @param owner                    Owner of the new account
 * @param allowOwnerOffCurve       Allow the owner account to be a PDA (Program Derived Address)
 * @param programId                SPL Token program account
 * @param associatedTokenProgramId SPL Associated Token program account
 *
 * @return Promise containing the address of the associated token account
 */
export async function getAssociatedTokenAddress(
    mint: PublicKey,
    owner: PublicKey,
    allowOwnerOffCurve = false,
    programId = TOKEN_PROGRAM_ID,
    associatedTokenProgramId = ASSOCIATED_TOKEN_PROGRAM_ID
): Promise<PublicKey> {
    if (!allowOwnerOffCurve && !PublicKey.isOnCurve(owner.toBuffer())) throw new TokenOwnerOffCurveError();

    const [address] = await PublicKey.findProgramAddress(
        [owner.toBuffer(), programId.toBuffer(), mint.toBuffer()],
        associatedTokenProgramId
    );

    return address;
}

/**
 * Get the address of the associated token account for a given mint and owner
 *
 * @param mint                     Token mint account
 * @param owner                    Owner of the new account
 * @param allowOwnerOffCurve       Allow the owner account to be a PDA (Program Derived Address)
 * @param programId                SPL Token program account
 * @param associatedTokenProgramId SPL Associated Token program account
 *
 * @return Address of the associated token account
 */
export function getAssociatedTokenAddressSync(
    mint: PublicKey,
    owner: PublicKey,
    allowOwnerOffCurve = false,
    programId = TOKEN_PROGRAM_ID,
    associatedTokenProgramId = ASSOCIATED_TOKEN_PROGRAM_ID
): PublicKey {
    if (!allowOwnerOffCurve && !PublicKey.isOnCurve(owner.toBuffer())) throw new TokenOwnerOffCurveError();

    const [address] = PublicKey.findProgramAddressSync(
        [owner.toBuffer(), programId.toBuffer(), mint.toBuffer()],
        associatedTokenProgramId
    );

    return address;
}
