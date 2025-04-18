import { struct, u8 } from '@bbachain/buffer-layout';
import { AccountState } from '../../state';
import { Mint } from '../../state';
import { ExtensionType, getExtensionData } from '../extensionType';

/** DefaultAccountState as stored by the program */
export interface DefaultAccountState {
    /** Default AccountState in which new accounts are initialized */
    state: AccountState;
}

/** Buffer layout for de/serializing a transfer fee config extension */
export const DefaultAccountStateLayout = struct<DefaultAccountState>([u8('state')]);

export const DEFAULT_ACCOUNT_STATE_SIZE = DefaultAccountStateLayout.span;

export function getDefaultAccountState(mint: Mint): DefaultAccountState | null {
    const extensionData = getExtensionData(ExtensionType.DefaultAccountState, mint.tlvData);
    if (extensionData !== null) {
        return DefaultAccountStateLayout.decode(extensionData);
    } else {
        return null;
    }
}
