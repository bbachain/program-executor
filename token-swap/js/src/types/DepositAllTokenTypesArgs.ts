import * as beet from '@bbachain/beet';

/**
 * DepositAllTokenTypes instruction arguments
 *
 * @category userTypes
 */
export type DepositAllTokenTypesArgs = {
  poolTokenAmount: beet.bignum;
  maximumTokenAAmount: beet.bignum;
  maximumTokenBAmount: beet.bignum;
};

/**
 * @category userTypes
 */
export const depositAllTokenTypesArgsBeet =
  new beet.FixableBeetArgsStruct<DepositAllTokenTypesArgs>(
    [
      ['poolTokenAmount', beet.u64],
      ['maximumTokenAAmount', beet.u64],
      ['maximumTokenBAmount', beet.u64],
    ],
    'DepositAllTokenTypesArgs'
  );
