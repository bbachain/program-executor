import BN from 'bn.js';
import { Fees, SwapCurve, CurveType } from '../types';

/**
 * Helper function to create a ConstantProduct swap curve
 *
 * @category helpers
 */
export function createConstantProductCurve(): SwapCurve {
  return {
    curveType: CurveType.ConstantProduct,
    calculator: new Array(32).fill(0),
  };
}

/**
 * Helper function to create default fees (0.25% trade fee, 0.05% owner fee)
 *
 * @category helpers
 */
export function createDefaultFees(): Fees {
  return {
    tradeFeeNumerator: new BN(25), // 0.25%
    tradeFeeDenominator: new BN(10000),
    ownerTradeFeeNumerator: new BN(5), // 0.05%
    ownerTradeFeeDenominator: new BN(10000),
    ownerWithdrawFeeNumerator: new BN(0),
    ownerWithdrawFeeDenominator: new BN(0),
    hostFeeNumerator: new BN(0),
    hostFeeDenominator: new BN(0),
  };
}

/**
 * Helper function to create zero fees
 *
 * @category helpers
 */
export function createZeroFees(): Fees {
  return {
    tradeFeeNumerator: new BN(0),
    tradeFeeDenominator: new BN(1),
    ownerTradeFeeNumerator: new BN(0),
    ownerTradeFeeDenominator: new BN(1),
    ownerWithdrawFeeNumerator: new BN(0),
    ownerWithdrawFeeDenominator: new BN(1),
    hostFeeNumerator: new BN(0),
    hostFeeDenominator: new BN(1),
  };
}

/**
 * Helper function to create fees with custom trade fee percentage
 *
 * @param tradeFeePercentage - Fee percentage (e.g., 0.3 for 0.3%)
 * @category helpers
 */
export function createCustomFees(tradeFeePercentage: number): Fees {
  const tradeFeeNumerator = Math.floor(tradeFeePercentage * 100);
  return {
    tradeFeeNumerator: new BN(tradeFeeNumerator),
    tradeFeeDenominator: new BN(10000),
    ownerTradeFeeNumerator: new BN(0),
    ownerTradeFeeDenominator: new BN(1),
    ownerWithdrawFeeNumerator: new BN(0),
    ownerWithdrawFeeDenominator: new BN(1),
    hostFeeNumerator: new BN(0),
    hostFeeDenominator: new BN(1),
  };
}

/**
 * Helper function to create ConstantPrice curve
 *
 * @category helpers
 */
export function createConstantPriceCurve(): SwapCurve {
  return {
    curveType: CurveType.ConstantPrice,
    calculator: new Array(32).fill(0),
  };
}

/**
 * Helper function to create Stable curve
 *
 * @category helpers
 */
export function createStableCurve(): SwapCurve {
  return {
    curveType: CurveType.Stable,
    calculator: new Array(32).fill(0),
  };
}

/**
 * Helper function to create Offset curve
 *
 * @category helpers
 */
export function createOffsetCurve(): SwapCurve {
  return {
    curveType: CurveType.Offset,
    calculator: new Array(32).fill(0),
  };
}
