import * as beet from '@bbachain/beet';
import * as beetBBA from '@bbachain/beet-bbachain';
import * as web3 from '@bbachain/web3.js';

export type Creator = {
  address: web3.PublicKey;
  verified: boolean;
  share: number;
};

/**
 * @category userTypes
 */
export const creatorBeet = new beet.BeetArgsStruct<Creator>(
  [
    ['address', beetBBA.publicKey],
    ['verified', beet.bool],
    ['share', beet.u8],
  ],
  'Creator',
);
