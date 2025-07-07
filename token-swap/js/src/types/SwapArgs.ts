import * as beet from '@bbachain/beet';

/**
 * Swap instruction arguments
 *
 * @category userTypes
 * @category generated
 */
export type SwapArgs = {
  amountIn: beet.bignum;
  minimumAmountOut: beet.bignum;
};

/**
 * @category userTypes
 * @category generated
 */
export const swapArgsBeet = new beet.FixableBeetArgsStruct<SwapArgs>(
  [
    ['amountIn', beet.u64],
    ['minimumAmountOut', beet.u64],
  ],
  'SwapArgs'
);
