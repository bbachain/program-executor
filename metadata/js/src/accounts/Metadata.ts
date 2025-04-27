import * as beet from '@bbachain/beet';
import * as beetBBA from '@bbachain/beet-bbachain';
import * as web3 from '@bbachain/web3.js';
import {
    Collection,
    collectionBeet,
    CollectionDetails,
    collectionDetailsBeet,
    Data,
    dataBeet,
    Key,
    keyBeet,
    TokenStandard,
    tokenStandardBeet,
    Uses,
    usesBeet,
} from '../types';
import * as customSerializer from '../helpers/metadata-deserializer';
import { PROGRAM_ADDRESS } from '..';

/**
 * Arguments used to create {@link Metadata}
 * @category Accounts
 */
export type MetadataArgs = {
    key: Key;
    updateAuthority: web3.PublicKey;
    mint: web3.PublicKey;
    data: Data;
    primarySaleHappened: boolean;
    isMutable: boolean;
    tokenStandard: beet.COption<TokenStandard>;
    collection: beet.COption<Collection>;
    collectionDetails: beet.COption<CollectionDetails>;
    uses: beet.COption<Uses>;
};
/**
 * Holds the data for the {@link Metadata} Account and provides de/serialization
 * functionality for that data
 *
 * @category Accounts
 */
export class Metadata implements MetadataArgs {
    private constructor(
        readonly key: Key,
        readonly updateAuthority: web3.PublicKey,
        readonly mint: web3.PublicKey,
        readonly data: Data,
        readonly primarySaleHappened: boolean,
        readonly isMutable: boolean,
        readonly tokenStandard: beet.COption<TokenStandard>,
        readonly collection: beet.COption<Collection>,
        readonly collectionDetails: beet.COption<CollectionDetails>,
        readonly uses: beet.COption<Uses>
    ) {}

    /**
     * Creates a {@link Metadata} instance from the provided args.
     */
    static fromArgs(args: MetadataArgs) {
        return new Metadata(
            args.key,
            args.updateAuthority,
            args.mint,
            args.data,
            args.primarySaleHappened,
            args.isMutable,
            args.tokenStandard,
            args.collection,
            args.collectionDetails,
            args.uses
        );
    }

    /**
     * Deserializes the {@link Metadata} from the data of the provided {@link web3.AccountInfo}.
     * @returns a tuple of the account data and the offset up to which the buffer was read to obtain it.
     */
    static fromAccountInfo(accountInfo: web3.AccountInfo<Buffer>, offset = 0): [Metadata, number] {
        return Metadata.deserialize(accountInfo.data, offset);
    }

    /**
     * Retrieves the account info from the provided address and deserializes
     * the {@link Metadata} from its data.
     *
     * @throws Error if no account info is found at the address or if deserialization fails
     */
    static async fromAccountAddress(
        connection: web3.Connection,
        address: web3.PublicKey,
        commitmentOrConfig?: web3.Commitment | web3.GetAccountInfoConfig
    ): Promise<Metadata> {
        const accountInfo = await connection.getAccountInfo(address, commitmentOrConfig);
        if (accountInfo == null) {
            throw new Error(`Unable to find Metadata account at ${address}`);
        }
        return Metadata.fromAccountInfo(accountInfo, 0)[0];
    }

    /**
     * Provides a {@link web3.Connection.getProgramAccounts} config builder,
     * to fetch accounts matching filters that can be specified via that builder.
     *
     * @param programId - the program that owns the accounts we are filtering
     */
    static gpaBuilder(programId: web3.PublicKey = new web3.PublicKey(PROGRAM_ADDRESS)) {
        return beetBBA.GpaBuilder.fromStruct(programId, metadataBeet);
    }

    /**
     * Deserializes the {@link Metadata} from the provided data Buffer.
     * @returns a tuple of the account data and the offset up to which the buffer was read to obtain it.
     */
    static deserialize(buf: Buffer, offset = 0): [Metadata, number] {
        return resolvedDeserialize(buf, offset);
    }

    /**
     * Serializes the {@link Metadata} into a Buffer.
     * @returns a tuple of the created Buffer and the offset up to which the buffer was written to store it.
     */
    serialize(): [Buffer, number] {
        return resolvedSerialize(this);
    }

    /**
     * Returns the byteSize of a {@link Buffer} holding the serialized data of
     * {@link Metadata} for the provided args.
     *
     * @param args need to be provided since the byte size for this account
     * depends on them
     */
    static byteSize(args: MetadataArgs) {
        const instance = Metadata.fromArgs(args);
        return metadataBeet.toFixedFromValue(instance).byteSize;
    }

    /**
     * Fetches the minimum balance needed to exempt an account holding
     * {@link Metadata} data from rent
     *
     * @param args need to be provided since the byte size for this account
     * depends on them
     * @param connection used to retrieve the rent exemption information
     */
    static async getMinimumBalanceForRentExemption(
        args: MetadataArgs,
        connection: web3.Connection,
        commitment?: web3.Commitment
    ): Promise<number> {
        return connection.getMinimumBalanceForRentExemption(Metadata.byteSize(args), commitment);
    }

    /**
     * Returns a readable version of {@link Metadata} properties
     * and can be used to convert to JSON and/or logging
     */
    pretty() {
        return {
            key: 'Key.' + Key[this.key],
            updateAuthority: this.updateAuthority.toBase58(),
            mint: this.mint.toBase58(),
            data: this.data,
            primarySaleHappened: this.primarySaleHappened,
            isMutable: this.isMutable,
            tokenStandard: this.tokenStandard,
            collection: this.collection,
            collectionDetails: this.collectionDetails,
            uses: this.uses,
        };
    }
}

/**
 * @category Accounts
 */
export const metadataBeet = new beet.FixableBeetStruct<Metadata, MetadataArgs>(
    [
        ['key', keyBeet],
        ['updateAuthority', beetBBA.publicKey],
        ['mint', beetBBA.publicKey],
        ['data', dataBeet],
        ['primarySaleHappened', beet.bool],
        ['isMutable', beet.bool],
        ['tokenStandard', beet.coption(tokenStandardBeet)],
        ['collection', beet.coption(collectionBeet)],
        ['collectionDetails', beet.coption(collectionDetailsBeet)],
        ['uses', beet.coption(usesBeet)],
    ],
    Metadata.fromArgs,
    'Metadata'
);

const serializer = customSerializer as unknown as {
    serialize: typeof metadataBeet.serialize;
    deserialize: typeof metadataBeet.deserialize;
};

const resolvedSerialize =
    typeof serializer.serialize === 'function'
        ? serializer.serialize.bind(serializer)
        : metadataBeet.serialize.bind(metadataBeet);
const resolvedDeserialize =
    typeof serializer.deserialize === 'function'
        ? serializer.deserialize.bind(serializer)
        : metadataBeet.deserialize.bind(metadataBeet);
