import * as beet from '@bbachain/beet';
import { CollectionDetails, collectionDetailsBeet } from './CollectionDetails';
import { Data, dataBeet } from './Data';

export type CreateMetadataAccountArgs = {
  data: Data;
  isMutable: boolean;
  collectionDetails: beet.COption<CollectionDetails>;
};

/**
 * @category userTypes
 */
export const createMetadataAccountArgsBeet =
  new beet.FixableBeetArgsStruct<CreateMetadataAccountArgs>(
    [
      ['data', dataBeet],
      ['isMutable', beet.bool],
      ['collectionDetails', beet.coption(collectionDetailsBeet)],
    ],
    'CreateMetadataAccountArgs',
  );
