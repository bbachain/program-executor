import * as beet from '@bbachain/beet';
import { UseMethod, useMethodBeet } from './UseMethod';

export type Uses = {
  useMethod: UseMethod;
  remaining: beet.bignum;
  total: beet.bignum;
};

/**
 * @category userTypes
 */
export const usesBeet = new beet.BeetArgsStruct<Uses>(
  [
    ['useMethod', useMethodBeet],
    ['remaining', beet.u64],
    ['total', beet.u64],
  ],
  'Uses'
);
