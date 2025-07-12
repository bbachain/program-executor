import * as beet from '@bbachain/beet';

/**
 * Curve types supported by the token-swap program.
 *
 * @category enums
 */
export enum CurveType {
  ConstantProduct,
  ConstantPrice,
  Stable,
  Offset,
}

/**
 * @category userTypes
 */
export const curveTypeBeet = beet.fixedScalarEnum(
  CurveType
) as beet.FixedSizeBeet<CurveType, CurveType>;
