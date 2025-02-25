import { struct } from '@bbachain/buffer-layout';
import { bool } from '@bbachain/buffer-layout-utils';
import { Account } from '../../state';
import { ExtensionType, getExtensionData } from '../extensionType';

/** MemoTransfer as stored by the program */
export interface MemoTransfer {
    /** Require transfers into this account to be accompanied by a memo */
    requireIncomingTransferMemos: boolean;
}

/** Buffer layout for de/serializing a transfer fee config extension */
export const MemoTransferLayout = struct<MemoTransfer>([bool('requireIncomingTransferMemos')]);

export const MEMO_TRANSFER_SIZE = MemoTransferLayout.span;

export function getMemoTransfer(account: Account): MemoTransfer | null {
    const extensionData = getExtensionData(ExtensionType.MemoTransfer, account.tlvData);
    if (extensionData !== null) {
        return MemoTransferLayout.decode(extensionData);
    } else {
        return null;
    }
}
