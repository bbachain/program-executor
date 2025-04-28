import * as beet from '@bbachain/beet';
import * as beetBBA from '@bbachain/beet-bbachain';
import * as web3 from '@bbachain/web3.js';

export type Collection = {
  verified: boolean;
  key: web3.PublicKey;
};

/**
 * @category userTypes
 */
export const collectionBeet = new beet.BeetArgsStruct<Collection>(
  [
    ['verified', beet.bool],
    ['key', beetBBA.publicKey],
  ],
  'Collection'
);
