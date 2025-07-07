import * as beet from '@bbachain/beet';
import * as web3 from '@bbachain/web3.js';
import { WithdrawAllTokenTypesArgs, withdrawAllTokenTypesArgsBeet } from '../types';

/**
 * @category Instructions
 * @category WithdrawAllTokenTypes
 */
export type WithdrawAllTokenTypesInstructionAccounts = {
  /** Token-swap */
  tokenSwap: web3.PublicKey;
  /** swap authority */
  authority: web3.PublicKey;
  /** user transfer authority */
  userTransferAuthority: web3.PublicKey;
  /** Pool mint account, swap authority is the owner */
  poolMint: web3.PublicKey;
  /** SOURCE Pool account, amount is transferable by user transfer authority */
  source: web3.PublicKey;
  /** token_a Swap Account to withdraw FROM */
  fromA: web3.PublicKey;
  /** token_b Swap Account to withdraw FROM */
  fromB: web3.PublicKey;
  /** token_a user Account to credit */
  userAccountA: web3.PublicKey;
  /** token_b user Account to credit */
  userAccountB: web3.PublicKey;
  /** Fee account, to receive withdrawal fees */
  feeAccount: web3.PublicKey;
  /** Token program id */
  tokenProgram: web3.PublicKey;
  anchorRemainingAccounts?: web3.AccountMeta[];
};

export const withdrawAllTokenTypesInstructionDiscriminator = 3;

/**
 * Creates a _WithdrawAllTokenTypes_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 * 
 * @category Instructions
 * @category WithdrawAllTokenTypes
 */
export function createWithdrawAllTokenTypesInstruction(
  accounts: WithdrawAllTokenTypesInstructionAccounts,
  args: WithdrawAllTokenTypesArgs,
  programId = new web3.PublicKey('SwapD4hpSrcB23e4RGdXPBdNzgXoFGaTEa1ZwoouotX')
) {
  const [data] = withdrawAllTokenTypesInstructionStruct.serialize({
    instructionDiscriminator: withdrawAllTokenTypesInstructionDiscriminator,
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
      pubkey: accounts.poolMint,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.source,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.fromA,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.fromB,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.userAccountA,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.userAccountB,
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
const withdrawAllTokenTypesInstructionStruct = new beet.FixableBeetArgsStruct<
  WithdrawAllTokenTypesArgs & {
    instructionDiscriminator: number;
  }
>(
  [
    ['instructionDiscriminator', beet.u8],
    ...withdrawAllTokenTypesArgsBeet.fields,
  ],
  'WithdrawAllTokenTypesInstructionArgs'
);
