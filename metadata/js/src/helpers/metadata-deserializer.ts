import * as beet from '@bbachain/beet';
import * as beetBBA from '@bbachain/beet-bbachain';
import { Metadata } from '../accounts/Metadata';
import { collectionBeet, collectionDetailsBeet, dataBeet, keyBeet, tokenStandardBeet, usesBeet } from '../types';

const NONE_BYTE_SIZE = beet.coptionNone('').byteSize;

/**
 * This is a custom deserializer for TokenMetadata in order to mitigate acounts with corrupted
 * data on chain.
 *
 * Instead of failing the deserialization for the section that is possibly corrupt it just returns
 * `null` for the fields that would normally be stored in that section.
 *
 * This deserializer matches the [fix implemented in the Rust program](https://github.com/metaplex-foundation/metaplex-program-library/blob/df36da5a78fb17e1690247b8041b761d27c83b1b/token-metadata/program/src/deser.rs#L6).
 * Also @see ../../../program/src/deser.rs
 */
export function deserialize(buf: Buffer, offset = 0): [Metadata, number] {
    let cursor = offset;

    // key
    const key = keyBeet.read(buf, cursor);
    cursor += keyBeet.byteSize;

    // updateAuthority
    const updateAuthority = beetBBA.publicKey.read(buf, cursor);
    cursor += beetBBA.publicKey.byteSize;

    // mint
    const mint = beetBBA.publicKey.read(buf, cursor);
    cursor += beetBBA.publicKey.byteSize;

    // data
    const [data, dataDelta] = dataBeet.deserialize(buf, cursor);
    cursor = dataDelta;

    // primarySaleHappened
    const primarySaleHappened = beet.bool.read(buf, cursor);
    cursor += beet.bool.byteSize;

    // isMutable
    const isMutable = beet.bool.read(buf, cursor);
    cursor += beet.bool.byteSize;

    // tokenStandard
    const [tokenStandard, tokenDelta, tokenCorrupted] = tryReadOption(beet.coption(tokenStandardBeet), buf, cursor);
    cursor += tokenDelta;

    // collection
    const [collection, collectionDelta, collectionCorrupted] = tokenCorrupted
        ? [null, NONE_BYTE_SIZE, true]
        : tryReadOption(beet.coption(collectionBeet), buf, cursor);
    cursor += collectionDelta;

    // collection_details
    const [collectionDetails, collectionDetailsDelta, collectionDetailsCorrupted] =
        tokenCorrupted || collectionCorrupted
            ? [null, NONE_BYTE_SIZE, true]
            : tryReadOption(beet.coption(collectionDetailsBeet), buf, cursor);
    cursor += collectionDetailsDelta;

    // uses
    const [uses, usesDelta, usesCorrupted] =
        tokenCorrupted || collectionCorrupted || collectionDetailsCorrupted
            ? [null, NONE_BYTE_SIZE, true]
            : tryReadOption(beet.coption(usesBeet), buf, cursor);
    cursor += usesDelta;

    const anyCorrupted =
        tokenCorrupted ||
        collectionCorrupted ||
        usesCorrupted ||
        collectionDetailsCorrupted;

    const args = {
        key,
        updateAuthority,
        mint,
        data,
        primarySaleHappened,
        isMutable,
        tokenStandard: anyCorrupted ? null : tokenStandard,
        collection: anyCorrupted ? null : collection,
        collectionDetails: anyCorrupted ? null : collectionDetails,
        uses: anyCorrupted ? null : uses,
    };

    return [Metadata.fromArgs(args), cursor];
}

function tryReadOption<T>(
    optionBeet: beet.FixableBeet<T, Partial<T>>,
    buf: Buffer,
    offset: number
): [T | null, number, boolean] {
    try {
        const fixed = optionBeet.toFixedFromData(buf, offset);
        const value = fixed.read(buf, offset);
        return [value, fixed.byteSize, false];
    } catch (e) {
        return [null, NONE_BYTE_SIZE, true];
    }
}
