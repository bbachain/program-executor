import * as beet from '@bbachain/beet';
import * as web3 from '@bbachain/web3.js';
import { InitializeArgs, initializeArgsBeet } from '../types';
import { PROGRAM_ADDRESS } from '..';

/**
 * @category Instructions
 * @category Initialize
 */
export type InitializeInstructionAccounts = {
  /** New Token-swap to create */
  tokenSwap: web3.PublicKey;
  /** swap authority derived from create_program_address(&[Token-swap account]) */
  authority: web3.PublicKey;
  /** token_a Account. Must be non zero, owned by swap authority */
  tokenA: web3.PublicKey;
  /** token_b Account. Must be non zero, owned by swap authority */
  tokenB: web3.PublicKey;
  /** Pool Token Mint. Must be empty, owned by swap authority */
  poolMint: web3.PublicKey;
  /** Pool Token Account to deposit trading and withdraw fees */
  feeAccount: web3.PublicKey;
  /** Pool Token Account to deposit the initial pool token supply */
  destination: web3.PublicKey;
  /** Token program id */
  tokenProgram: web3.PublicKey;
  anchorRemainingAccounts?: web3.AccountMeta[];
};

export const initializeInstructionDiscriminator = 0;

/**
 * Creates a _Initialize_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category Initialize
 */
export function createInitializeInstruction(
  accounts: InitializeInstructionAccounts,
  args: InitializeArgs,
  programId = new web3.PublicKey(PROGRAM_ADDRESS)
) {
  const [data] = initializeInstructionStruct.serialize({
    instructionDiscriminator: initializeInstructionDiscriminator,
    ...args,
  });
  const keys: web3.AccountMeta[] = [
    {
      pubkey: accounts.tokenSwap,
      isWritable: true,
      isSigner: true,
    },
    {
      pubkey: accounts.authority,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.tokenA,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.tokenB,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.poolMint,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.feeAccount,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.destination,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.tokenProgram,
      isWritable: false,
      isSigner: false,
    },
  ];

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
const initializeInstructionStruct = new beet.FixableBeetArgsStruct<
  InitializeArgs & {
    instructionDiscriminator: number;
  }
>(
  [['instructionDiscriminator', beet.u8], ...initializeArgsBeet.fields],
  'InitializeInstructionArgs'
);
