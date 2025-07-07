import * as beet from '@bbachain/beet';
import * as web3 from '@bbachain/web3.js';
import { SwapArgs, swapArgsBeet } from '../types';

/**
 * @category Instructions
 * @category Swap
 */
export type SwapInstructionAccounts = {
  /** Token-swap */
  tokenSwap: web3.PublicKey;
  /** swap authority */
  authority: web3.PublicKey;
  /** user transfer authority */
  userTransferAuthority: web3.PublicKey;
  /** token_(A|B) SOURCE Account, amount is transferable by user transfer authority */
  source: web3.PublicKey;
  /** token_(A|B) Base Account to swap INTO. Must be the SOURCE token */
  swapSource: web3.PublicKey;
  /** token_(A|B) Base Account to swap FROM. Must be the DESTINATION token */
  swapDestination: web3.PublicKey;
  /** token_(A|B) DESTINATION Account assigned to USER as the owner */
  destination: web3.PublicKey;
  /** Pool token mint, to generate trading fees */
  poolMint: web3.PublicKey;
  /** Fee account, to receive trading fees */
  feeAccount: web3.PublicKey;
  /** Token program id */
  tokenProgram: web3.PublicKey;
  /** [optional] Host fee account to receive additional trading fees */
  hostFeeAccount?: web3.PublicKey;
  anchorRemainingAccounts?: web3.AccountMeta[];
};

export const swapInstructionDiscriminator = 1;

/**
 * Creates a _Swap_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category Swap
 */
export function createSwapInstruction(
  accounts: SwapInstructionAccounts,
  args: SwapArgs,
  programId = new web3.PublicKey('SwapD4hpSrcB23e4RGdXPBdNzgXoFGaTEa1ZwoouotX')
) {
  const [data] = swapInstructionStruct.serialize({
    instructionDiscriminator: swapInstructionDiscriminator,
    ...args,
  });
  const keys: web3.AccountMeta[] = [
    {
      pubkey: accounts.tokenSwap,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.authority,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.userTransferAuthority,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.source,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.swapSource,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.swapDestination,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.destination,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.poolMint,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.feeAccount,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.tokenProgram,
      isWritable: false,
      isSigner: false,
    },
  ];

  if (accounts.hostFeeAccount != null) {
    keys.push({
      pubkey: accounts.hostFeeAccount,
      isWritable: true,
      isSigner: false,
    });
  }

  if (accounts.anchorRemainingAccounts != null) {
    keys.push(...accounts.anchorRemainingAccounts);
  }

  const ix = new web3.TransactionInstruction({
    programId,
    keys,
    data,
  });
  return ix;
}

/**
 * A union of all instruction structs
 */
const swapInstructionStruct = new beet.FixableBeetArgsStruct<
  SwapArgs & {
    instructionDiscriminator: number;
  }
>(
  [['instructionDiscriminator', beet.u8], ...swapArgsBeet.fields],
  'SwapInstructionArgs'
);
