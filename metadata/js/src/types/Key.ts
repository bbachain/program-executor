import * as beet from '@bbachain/beet';

/**
 * @category enums
 */
export enum Key {
    Uninitialized,
    Metadata,
}

/**
 * @category userTypes
 */
export const keyBeet = beet.fixedScalarEnum(Key) as beet.FixedSizeBeet<Key, Key>;
