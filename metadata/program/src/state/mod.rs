pub(crate) mod collection;
pub(crate) mod creator;
pub(crate) mod data;
pub mod fee;
pub(crate) mod metadata;
pub(crate) mod uses;

use std::io::ErrorKind;

use borsh::{maybestd::io::Error as BorshError, BorshDeserialize, BorshSerialize};
pub use collection::*;
pub use creator::*;
pub use data::*;
pub use fee::*;
pub use metadata::*;
use num_derive::FromPrimitive;
use num_traits::FromPrimitive;
use shank::ShankAccount;
use solana_program::{account_info::AccountInfo, program_error::ProgramError, pubkey::Pubkey};
pub use uses::*;

#[cfg(feature = "serde-feature")]
use {
    serde::{Deserialize, Deserializer, Serialize},
    serde_with::{As, DisplayFromStr},
    std::str::FromStr,
};

// Re-export constants to maintain compatibility.
use crate::{assertions::assert_owned_by, error::MetadataError, ID};
pub use crate::pda::PREFIX;

#[repr(C)]
#[cfg_attr(feature = "serde-feature", derive(Serialize, Deserialize))]
#[derive(BorshSerialize, BorshDeserialize, PartialEq, Eq, Debug, Clone, Copy, FromPrimitive)]
pub enum TokenStandard {
    Fungible,    // A token with with metadata
    NonFungible, // A non-fungible token with metadata
}

impl From<u8> for TokenStandard {
    fn from(value: u8) -> Self {
        match value {
            0 => TokenStandard::Fungible,
            1 => TokenStandard::NonFungible,
            _ => panic!("Invalid token standard"),
        }
    }
}

#[repr(C)]
#[cfg_attr(feature = "serde-feature", derive(Serialize, Deserialize))]
#[derive(BorshSerialize, BorshDeserialize, PartialEq, Eq, Debug, Clone, Copy, FromPrimitive)]
pub enum Key {
    Uninitialized,
    Metadata,
}

pub trait TokenMetadataAccount: BorshDeserialize {
    fn key() -> Key;

    fn size() -> usize;

    fn is_correct_account_type(data: &[u8], data_type: Key, data_size: usize) -> bool {
        if data.is_empty() {
            return false;
        }

        let key: Option<Key> = Key::from_u8(data[0]);
        match key {
            Some(key) => {
                (key == data_type || key == Key::Uninitialized)
                    && (data.len() == data_size || data_size == 0)
            }
            None => false,
        }
    }

    fn pad_length(buf: &mut Vec<u8>) -> Result<(), MetadataError> {
        if Self::size() != 0 {
            let padding_length = Self::size()
                .checked_sub(buf.len())
                .ok_or(MetadataError::NumericalOverflowError)?;
            buf.extend(vec![0; padding_length]);
        }
        Ok(())
    }

    fn safe_deserialize(mut data: &[u8]) -> Result<Self, BorshError> {
        if !Self::is_correct_account_type(data, Self::key(), Self::size()) {
            return Err(BorshError::new(ErrorKind::Other, "DataTypeMismatch"));
        }

        let result = Self::deserialize(&mut data)?;

        Ok(result)
    }

    fn from_account_info(a: &AccountInfo) -> Result<Self, ProgramError>
where {
        let data = &a.data.borrow_mut();

        let ua = Self::safe_deserialize(data).map_err(|_| MetadataError::DataTypeMismatch)?;

        // Check that this is a `token-metadata` owned account.
        assert_owned_by(a, &ID)?;

        Ok(ua)
    }
}
