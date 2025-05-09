import { struct } from '@bbachain/buffer-layout';
import { Account } from '../state/account';
import { ExtensionType, getExtensionData } from './extensionType';

/** ImmutableOwner as stored by the program */
export interface ImmutableOwner {} // eslint-disable-line

/** Buffer layout for de/serializing an account */
export const ImmutableOwnerLayout = struct<ImmutableOwner>([]);

export const IMMUTABLE_OWNER_SIZE = ImmutableOwnerLayout.span;

export function getImmutableOwner(account: Account): ImmutableOwner | null {
    const extensionData = getExtensionData(ExtensionType.ImmutableOwner, account.tlvData);
    if (extensionData !== null) {
        return ImmutableOwnerLayout.decode(extensionData);
    } else {
        return null;
    }
}
