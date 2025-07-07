import * as beet from '@bbachain/beet';

/**
 * Fees struct for swap operations
 *
 * @category userTypes
 * @category generated
 */
export type Fees = {
  tradeFeeNumerator: beet.bignum;
  tradeFeeDenominator: beet.bignum;
  ownerTradeFeeNumerator: beet.bignum;
  ownerTradeFeeDenominator: beet.bignum;
  ownerWithdrawFeeNumerator: beet.bignum;
  ownerWithdrawFeeDenominator: beet.bignum;
  hostFeeNumerator: beet.bignum;
  hostFeeDenominator: beet.bignum;
};

/**
 * @category userTypes
 * @category generated
 */
export const feesBeet = new beet.FixableBeetArgsStruct<Fees>(
  [
    ['tradeFeeNumerator', beet.u64],
    ['tradeFeeDenominator', beet.u64],
    ['ownerTradeFeeNumerator', beet.u64],
    ['ownerTradeFeeDenominator', beet.u64],
    ['ownerWithdrawFeeNumerator', beet.u64],
    ['ownerWithdrawFeeDenominator', beet.u64],
    ['hostFeeNumerator', beet.u64],
    ['hostFeeDenominator', beet.u64],
  ],
  'Fees'
);
