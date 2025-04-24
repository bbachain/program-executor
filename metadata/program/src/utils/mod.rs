pub(crate) mod fee;
pub(crate) mod metadata;

pub use metadata::{process_create_metadata_accounts_logic, CreateMetadataAccountsLogicArgs};

use crate::{
    error::MetadataError,
    state::{
        Key, Metadata, TokenMetadataAccount, TokenStandard,
        MAX_NAME_LENGTH, MAX_SYMBOL_LENGTH, MAX_URI_LENGTH,
    },
};
