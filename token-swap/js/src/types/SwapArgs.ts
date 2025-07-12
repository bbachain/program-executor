import * as beet from '@bbachain/beet';

/**
 * Swap instruction arguments
 *
 * @category userTypes
 */
export type SwapArgs = {
  amountIn: beet.bignum;
  minimumAmountOut: beet.bignum;
};

/**
 * @category userTypes
 */
export const swapArgsBeet = new beet.FixableBeetArgsStruct<SwapArgs>(
  [
    ['amountIn', beet.u64],
    ['minimumAmountOut', beet.u64],
  ],
  'SwapArgs'
);
