import * as beet from '@bbachain/beet';
import * as beetBBA from '@bbachain/beet-bbachain';
import * as web3 from '@bbachain/web3.js';
import { Fees, feesBeet, SwapCurve, swapCurveBeet } from '../types';
import { PROGRAM_ADDRESS } from '..';

/**
 * Arguments used to create {@link TokenSwap}
 * @category Accounts
 */
export type TokenSwapArgs = {
  isInitialized: boolean;
  bumpSeed: number;
  tokenProgramId: web3.PublicKey;
  tokenA: web3.PublicKey;
  tokenB: web3.PublicKey;
  poolMint: web3.PublicKey;
  tokenAMint: web3.PublicKey;
  tokenBMint: web3.PublicKey;
  poolFeeAccount: web3.PublicKey;
  fees: Fees;
  swapCurve: SwapCurve;
};

/**
 * @category userTypes
 * @category generated
 */
export const tokenSwapBeet = new beet.FixableBeetArgsStruct<
  TokenSwapArgs & {
    accountDiscriminator: number;
  }
>(
  [
    ['accountDiscriminator', beet.u8],
    ['isInitialized', beet.bool],
    ['bumpSeed', beet.u8],
    ['tokenProgramId', beetBBA.publicKey],
    ['tokenA', beetBBA.publicKey],
    ['tokenB', beetBBA.publicKey],
    ['poolMint', beetBBA.publicKey],
    ['tokenAMint', beetBBA.publicKey],
    ['tokenBMint', beetBBA.publicKey],
    ['poolFeeAccount', beetBBA.publicKey],
    ['fees', feesBeet],
    ['swapCurve', swapCurveBeet],
  ],
  'TokenSwap'
);

/**
 * Holds the data for the {@link TokenSwap} Account and provides de/serialization
 * functionality for that data
 *
 * @category Accounts
 */
export class TokenSwap implements TokenSwapArgs {
  private constructor(
    readonly isInitialized: boolean,
    readonly bumpSeed: number,
    readonly tokenProgramId: web3.PublicKey,
    readonly tokenA: web3.PublicKey,
    readonly tokenB: web3.PublicKey,
    readonly poolMint: web3.PublicKey,
    readonly tokenAMint: web3.PublicKey,
    readonly tokenBMint: web3.PublicKey,
    readonly poolFeeAccount: web3.PublicKey,
    readonly fees: Fees,
    readonly swapCurve: SwapCurve
  ) {}

  /**
   * Creates a {@link TokenSwap} instance from the provided args.
   */
  static fromArgs(args: TokenSwapArgs) {
    return new TokenSwap(
      args.isInitialized,
      args.bumpSeed,
      args.tokenProgramId,
      args.tokenA,
      args.tokenB,
      args.poolMint,
      args.tokenAMint,
      args.tokenBMint,
      args.poolFeeAccount,
      args.fees,
      args.swapCurve
    );
  }

  /**
   * Deserializes the {@link TokenSwap} from the data of the provided {@link web3.AccountInfo}.
   * @returns a tuple of the account data and the offset up to which the buffer was read to obtain it.
   */
  static fromAccountInfo(
    accountInfo: web3.AccountInfo<Buffer>,
    offset = 0
  ): [TokenSwap, number] {
    return TokenSwap.deserialize(accountInfo.data, offset);
  }

  /**
   * Retrieves the account info from the provided address and deserializes
   * the {@link TokenSwap} from its data.
   *
   * @throws Error if no account info is found at the address or if deserialization fails
   */
  static async fromAccountAddress(
    connection: web3.Connection,
    address: web3.PublicKey,
    commitmentOrConfig?: web3.Commitment | web3.GetAccountInfoConfig
  ): Promise<TokenSwap> {
    const accountInfo = await connection.getAccountInfo(
      address,
      commitmentOrConfig
    );
    if (accountInfo == null) {
      throw new Error(`Unable to find TokenSwap account at ${address}`);
    }
    return TokenSwap.fromAccountInfo(accountInfo, 0)[0];
  }

  /**
   * Provides a {@link web3.Connection.getProgramAccounts} config
   * to fetch accounts matching filters that can be passed to this function.
   *
   * @param filters filters used to match accounts
   * @returns {GetProgramAccountsConfig} config which can be used to fetch accounts
   */
  static gpaBuilder(
    programId: web3.PublicKey = new web3.PublicKey(PROGRAM_ADDRESS)
  ) {
    return beetBBA.GpaBuilder.fromStruct(programId, tokenSwapBeet);
  }

  /**
   * Deserializes the {@link TokenSwap} from the provided data Buffer.
   * @returns a tuple of the account data and the offset up to which the buffer was read to obtain it.
   */
  static deserialize(buf: Buffer, offset = 0): [TokenSwap, number] {
    const [raw, offset2] = tokenSwapBeet.deserialize(buf, offset);
    return [TokenSwap.fromArgs(raw), offset2];
  }

  /**
   * Serializes the {@link TokenSwap} into a Buffer.
   * @returns a tuple of the created Buffer and the offset up to which the buffer was written to store it.
   */
  serialize(): [Buffer, number] {
    return tokenSwapBeet.serialize({
      accountDiscriminator: 1,
      ...this,
    });
  }

  /**
   * Returns the byteSize of a {@link Buffer} holding the serialized data of
   * {@link TokenSwap} - note this is a rough estimate
   */
  static get byteSize() {
    return 500; // Rough estimate due to variable size fields
  }

  /**
   * Fetches the minimum balance needed to exempt an account holding
   * {@link TokenSwap} data from rent
   *
   * @param connection used to retrieve the rent exemption information
   */
  static async getMinimumBalanceForRentExemption(
    connection: web3.Connection,
    commitment?: web3.Commitment
  ): Promise<number> {
    return connection.getMinimumBalanceForRentExemption(
      TokenSwap.byteSize,
      commitment
    );
  }

  /**
   * Determines if the provided {@link Buffer} has the correct byte size to
   * hold {@link TokenSwap} data.
   */
  static hasCorrectByteSize(buf: Buffer, offset = 0) {
    return buf.byteLength - offset >= TokenSwap.byteSize;
  }

  /**
   * Returns a readable version of {@link TokenSwap} properties
   * and can be used to convert to JSON and/or logging
   */
  pretty() {
    return {
      isInitialized: this.isInitialized,
      bumpSeed: this.bumpSeed,
      tokenProgramId: this.tokenProgramId.toBase58(),
      tokenA: this.tokenA.toBase58(),
      tokenB: this.tokenB.toBase58(),
      poolMint: this.poolMint.toBase58(),
      tokenAMint: this.tokenAMint.toBase58(),
      tokenBMint: this.tokenBMint.toBase58(),
      poolFeeAccount: this.poolFeeAccount.toBase58(),
      fees: this.fees,
      swapCurve: this.swapCurve,
    };
  }
}
