import * as beet from '@bbachain/beet';

/**
 * WithdrawAllTokenTypes instruction arguments
 *
 * @category userTypes
 * @category generated
 */
export type WithdrawAllTokenTypesArgs = {
  poolTokenAmount: beet.bignum;
  minimumTokenAAmount: beet.bignum;
  minimumTokenBAmount: beet.bignum;
};

/**
 * @category userTypes
 * @category generated
 */
export const withdrawAllTokenTypesArgsBeet =
  new beet.FixableBeetArgsStruct<WithdrawAllTokenTypesArgs>(
    [
      ['poolTokenAmount', beet.u64],
      ['minimumTokenAAmount', beet.u64],
      ['minimumTokenBAmount', beet.u64],
    ],
    'WithdrawAllTokenTypesArgs'
  );
