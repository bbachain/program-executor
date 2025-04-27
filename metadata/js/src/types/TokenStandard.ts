import * as beet from '@bbachain/beet';

/**
 * @category enums
 */
export enum TokenStandard {
  NonFungible,
  Fungible,
}

/**
 * @category userTypes
 */
export const tokenStandardBeet = beet.fixedScalarEnum(TokenStandard) as beet.FixedSizeBeet<
  TokenStandard,
  TokenStandard
>;
