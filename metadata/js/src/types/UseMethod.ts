import * as beet from '@bbachain/beet';

/**
 * @category enums
 */
export enum UseMethod {
  Burn,
  Multiple,
  Single,
}

/**
 * @category userTypes
 */
export const useMethodBeet = beet.fixedScalarEnum(
  UseMethod
) as beet.FixedSizeBeet<UseMethod, UseMethod>;
