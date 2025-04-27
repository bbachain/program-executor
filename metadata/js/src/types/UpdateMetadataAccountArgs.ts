import * as beet from '@bbachain/beet';
import * as beetBBA from '@bbachain/beet-bbachain';
import * as web3 from '@bbachain/web3.js';
import { Data, dataBeet } from './Data';

export type UpdateMetadataAccountArgs = {
  data: beet.COption<Data>;
  updateAuthority: beet.COption<web3.PublicKey>;
  primarySaleHappened: beet.COption<boolean>;
  isMutable: beet.COption<boolean>;
};

/**
 * @category userTypes
 */
export const updateMetadataAccountArgsBeet =
  new beet.FixableBeetArgsStruct<UpdateMetadataAccountArgs>(
    [
      ['data', beet.coption(dataBeet)],
      ['updateAuthority', beet.coption(beetBBA.publicKey)],
      ['primarySaleHappened', beet.coption(beet.bool)],
      ['isMutable', beet.coption(beet.bool)],
    ],
    'UpdateMetadataAccountArgs'
  );
