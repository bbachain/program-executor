import * as beet from '@bbachain/beet';
import { CurveType, curveTypeBeet } from './CurveType';

/**
 * SwapCurve struct containing curve type and calculator
 *
 * @category userTypes
 * @category generated
 */
export type SwapCurve = {
  curveType: CurveType;
  calculator: number[]; // Fixed 32 bytes for calculator data represented as number array
};

/**
 * @category userTypes
 * @category generated
 */
export const swapCurveBeet = new beet.FixableBeetArgsStruct<SwapCurve>(
  [
    ['curveType', curveTypeBeet],
    ['calculator', beet.array(beet.u8)], // Fixed 32 bytes
  ],
  'SwapCurve'
);
