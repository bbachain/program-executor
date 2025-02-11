import { struct } from '@bbachain/buffer-layout';
import { publicKey } from '@bbachain/buffer-layout-utils';
import { PublicKey } from '@bbachain/web3.js';
import { Mint } from '../state/mint';
import { ExtensionType, getExtensionData } from './extensionType';

/** MintCloseAuthority as stored by the program */
export interface MintCloseAuthority {
    closeAuthority: PublicKey;
}

/** Buffer layout for de/serializing a mint */
export const MintCloseAuthorityLayout = struct<MintCloseAuthority>([publicKey('closeAuthority')]);

export const MINT_CLOSE_AUTHORITY_SIZE = MintCloseAuthorityLayout.span;

export function getMintCloseAuthority(mint: Mint): MintCloseAuthority | null {
    const extensionData = getExtensionData(ExtensionType.MintCloseAuthority, mint.tlvData);
    if (extensionData !== null) {
        return MintCloseAuthorityLayout.decode(extensionData);
    } else {
        return null;
    }
}
