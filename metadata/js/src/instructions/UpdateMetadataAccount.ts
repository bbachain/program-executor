import * as beet from '@bbachain/beet';
import * as web3 from '@bbachain/web3.js';
import {
  UpdateMetadataAccountArgs,
  updateMetadataAccountArgsBeet,
} from '../types';
import { PROGRAM_ADDRESS } from '..';

/**
 * @category Instructions
 * @category UpdateMetadataAccount
 */
export type UpdateMetadataAccountInstructionArgs = {
  updateMetadataAccountArgs: UpdateMetadataAccountArgs;
};
/**
 * @category Instructions
 * @category UpdateMetadataAccount
 */
export const UpdateMetadataAccountStruct = new beet.FixableBeetArgsStruct<
  UpdateMetadataAccountInstructionArgs & {
    instructionDiscriminator: number;
  }
>(
  [
    ['instructionDiscriminator', beet.u8],
    ['updateMetadataAccountArgs', updateMetadataAccountArgsBeet],
  ],
  'UpdateMetadataAccountInstructionArgs'
);
/**
 * Accounts required by the _UpdateMetadataAccount_ instruction
 *
 * @property [_writable_] metadata Metadata account
 * @property [**signer**] updateAuthority Update authority key
 * @category Instructions
 * @category UpdateMetadataAccount
 */
export type UpdateMetadataAccountInstructionAccounts = {
  metadata: web3.PublicKey;
  updateAuthority: web3.PublicKey;
};

export const updateMetadataAccountInstructionDiscriminator = 1;

/**
 * Creates a _UpdateMetadataAccount_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category UpdateMetadataAccount
 */
export function createUpdateMetadataAccountInstruction(
  accounts: UpdateMetadataAccountInstructionAccounts,
  args: UpdateMetadataAccountInstructionArgs,
  programId = new web3.PublicKey(PROGRAM_ADDRESS)
) {
  const [data] = UpdateMetadataAccountStruct.serialize({
    instructionDiscriminator: updateMetadataAccountInstructionDiscriminator,
    ...args,
  });
  const keys: web3.AccountMeta[] = [
    {
      pubkey: accounts.metadata,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.updateAuthority,
      isWritable: false,
      isSigner: true,
    },
  ];

  const ix = new web3.TransactionInstruction({
    programId,
    keys,
    data,
  });
  return ix;
}
