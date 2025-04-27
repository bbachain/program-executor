import * as beet from '@bbachain/beet';
import * as web3 from '@bbachain/web3.js';
import {
  CreateMetadataAccountArgs,
  createMetadataAccountArgsBeet,
} from '../types';
import { PROGRAM_ADDRESS } from '..';

/**
 * @category Instructions
 * @category CreateMetadataAccount
 */
export type CreateMetadataAccountInstructionArgs = {
  createMetadataAccountArgs: CreateMetadataAccountArgs;
};
/**
 * @category Instructions
 * @category CreateMetadataAccount
 */
export const CreateMetadataAccountStruct = new beet.FixableBeetArgsStruct<
  CreateMetadataAccountInstructionArgs & {
    instructionDiscriminator: number;
  }
>(
  [
    ['instructionDiscriminator', beet.u8],
    ['createMetadataAccountArgs', createMetadataAccountArgsBeet],
  ],
  'CreateMetadataAccountInstructionArgs',
);
/**
 * Accounts required by the _CreateMetadataAccount_ instruction
 *
 * @property [_writable_] metadata Metadata key (pda of ['metadata', program id, mint id])
 * @property [] mint Mint of token asset
 * @property [**signer**] mintAuthority Mint authority
 * @property [_writable_, **signer**] payer payer
 * @property [] updateAuthority update authority info
 * @category Instructions
 * @category CreateMetadataAccount
 */
export type CreateMetadataAccountInstructionAccounts = {
  metadata: web3.PublicKey;
  mint: web3.PublicKey;
  mintAuthority: web3.PublicKey;
  payer: web3.PublicKey;
  updateAuthority: web3.PublicKey;
  systemProgram?: web3.PublicKey;
  rent?: web3.PublicKey;
};

export const createMetadataAccountInstructionDiscriminator = 0;

/**
 * Creates a _CreateMetadataAccount_ instruction.
 *
 * Optional accounts that are not provided will be omitted from the accounts
 * array passed with the instruction.
 * An optional account that is set cannot follow an optional account that is unset.
 * Otherwise an Error is raised.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category CreateMetadataAccount
 */
export function createCreateMetadataAccountInstruction(
  accounts: CreateMetadataAccountInstructionAccounts,
  args: CreateMetadataAccountInstructionArgs,
  programId = new web3.PublicKey(PROGRAM_ADDRESS),
) {
  const [data] = CreateMetadataAccountStruct.serialize({
    instructionDiscriminator: createMetadataAccountInstructionDiscriminator,
    ...args,
  });
  const keys: web3.AccountMeta[] = [
    {
      pubkey: accounts.metadata,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.mint,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.mintAuthority,
      isWritable: false,
      isSigner: true,
    },
    {
      pubkey: accounts.payer,
      isWritable: true,
      isSigner: true,
    },
    {
      pubkey: accounts.updateAuthority,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.systemProgram ?? web3.SystemProgram.programId,
      isWritable: false,
      isSigner: false,
    },
  ];

  if (accounts.rent != null) {
    keys.push({
      pubkey: accounts.rent,
      isWritable: false,
      isSigner: false,
    });
  }

  const ix = new web3.TransactionInstruction({
    programId,
    keys,
    data,
  });
  return ix;
}
