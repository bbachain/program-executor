import * as beet from '@bbachain/beet';

/**
 * Curve types supported by the token-swap program.
 *
 * @category Enums
 * @category generated
 */
export enum CurveType {
  ConstantProduct,
  ConstantPrice,
  Stable,
  Offset,
}

/**
 * @category userTypes
 * @category generated
 */
export const curveTypeBeet = beet.fixedScalarEnum(
  CurveType
) as beet.FixedSizeBeet<CurveType, CurveType>;
