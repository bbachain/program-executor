import * as beet from '@bbachain/beet';
import { Fees, feesBeet } from './Fees';
import { SwapCurve, swapCurveBeet } from './SwapCurve';

/**
 * Initialize instruction arguments
 *
 * @category userTypes
 */
export type InitializeArgs = {
  fees: Fees;
  swapCurve: SwapCurve;
};

/**
 * @category userTypes
 */
export const initializeArgsBeet =
  new beet.FixableBeetArgsStruct<InitializeArgs>(
    [
      ['fees', feesBeet],
      ['swapCurve', swapCurveBeet],
    ],
    'InitializeArgs'
  );
