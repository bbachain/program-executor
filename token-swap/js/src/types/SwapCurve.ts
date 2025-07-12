import * as beet from '@bbachain/beet';
import { CurveType, curveTypeBeet } from './CurveType';

/**
 * SwapCurve struct containing curve type and calculator
 *
 * @category userTypes
 */
export type SwapCurve = {
  curveType: CurveType;
  calculator: number[]; // Fixed 32 bytes for calculator data represented as number array
};

/**
 * @category userTypes
 */
export const swapCurveBeet = new beet.FixableBeetArgsStruct<SwapCurve>(
  [
    ['curveType', curveTypeBeet],
    ['calculator', beet.uniformFixedSizeArray(beet.u8, 32)], // Fixed 32 bytes without length prefix
  ],
  'SwapCurve'
);
