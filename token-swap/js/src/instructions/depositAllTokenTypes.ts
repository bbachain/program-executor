import * as beet from '@bbachain/beet';
import * as web3 from '@bbachain/web3.js';
import {
  DepositAllTokenTypesArgs,
  depositAllTokenTypesArgsBeet,
} from '../types';

/**
 * @category Instructions
 * @category DepositAllTokenTypes
 */
export type DepositAllTokenTypesInstructionAccounts = {
  /** Token-swap */
  tokenSwap: web3.PublicKey;
  /** swap authority */
  authority: web3.PublicKey;
  /** user transfer authority */
  userTransferAuthority: web3.PublicKey;
  /** token_a user transfer authority can transfer amount */
  sourceA: web3.PublicKey;
  /** token_b user transfer authority can transfer amount */
  sourceB: web3.PublicKey;
  /** token_a Base Account to deposit into */
  intoA: web3.PublicKey;
  /** token_b Base Account to deposit into */
  intoB: web3.PublicKey;
  /** Pool MINT account, swap authority is the owner */
  poolMint: web3.PublicKey;
  /** Pool Account to deposit the generated tokens, user is the owner */
  poolAccount: web3.PublicKey;
  /** Token program id */
  tokenProgram: web3.PublicKey;
  anchorRemainingAccounts?: web3.AccountMeta[];
};

export const depositAllTokenTypesInstructionDiscriminator = 2;

/**
 * Creates a _DepositAllTokenTypes_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category DepositAllTokenTypes
 */
export function createDepositAllTokenTypesInstruction(
  accounts: DepositAllTokenTypesInstructionAccounts,
  args: DepositAllTokenTypesArgs,
  programId = new web3.PublicKey('SwapD4hpSrcB23e4RGdXPBdNzgXoFGaTEa1ZwoouotX')
) {
  const [data] = depositAllTokenTypesInstructionStruct.serialize({
    instructionDiscriminator: depositAllTokenTypesInstructionDiscriminator,
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
      pubkey: accounts.sourceA,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.sourceB,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.intoA,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.intoB,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.poolMint,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.poolAccount,
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
const depositAllTokenTypesInstructionStruct = new beet.FixableBeetArgsStruct<
  DepositAllTokenTypesArgs & {
    instructionDiscriminator: number;
  }
>(
  [
    ['instructionDiscriminator', beet.u8],
    ...depositAllTokenTypesArgsBeet.fields,
  ],
  'DepositAllTokenTypesInstructionArgs'
);
