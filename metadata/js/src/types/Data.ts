import * as beet from '@bbachain/beet';
import { Creator, creatorBeet } from './Creator';
import { Collection, collectionBeet } from './Collection';
import { Uses, usesBeet } from './Uses';

export type Data = {
    name: string;
    symbol: string;
    uri: string;
    sellerFeeBasisPoints: number;
    creators: beet.COption<Creator[]>;
    collection: beet.COption<Collection>;
    uses: beet.COption<Uses>;
};

/**
 * @category userTypes
 */
export const dataBeet = new beet.FixableBeetArgsStruct<Data>(
    [
        ['name', beet.utf8String],
        ['symbol', beet.utf8String],
        ['uri', beet.utf8String],
        ['sellerFeeBasisPoints', beet.u16],
        ['creators', beet.coption(beet.array(creatorBeet))],
        ['collection', beet.coption(collectionBeet)],
        ['uses', beet.coption(usesBeet)],
    ],
    'Data'
);
