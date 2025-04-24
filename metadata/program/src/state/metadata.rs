use super::*;

pub const MAX_NAME_LENGTH: usize = 32;

pub const MAX_SYMBOL_LENGTH: usize = 10;

pub const MAX_URI_LENGTH: usize = 200;

pub const MAX_METADATA_LEN: usize = 1 // key
+ 32             // update auth pubkey
+ 32             // mint pubkey
+ MAX_DATA_SIZE
+ 1              // primary sale
+ 1              // mutable
+ 9              // nonce (pretty sure this only needs to be 2)
+ 2              // token standard
+ 34             // collection
+ 10             // collection details
+ 18             // uses
+ 1; // Fee flag

pub const MAX_DATA_SIZE: usize = 4
    + MAX_NAME_LENGTH
    + 4
    + MAX_SYMBOL_LENGTH
    + 4
    + MAX_URI_LENGTH
    + 2
    + 1
    + 4
    + MAX_CREATOR_LIMIT * MAX_CREATOR_LEN;

// The last byte of the account contains the fee flag, indicating
// if the account has fees available for retrieval.
pub const METADATA_FEE_FLAG_OFFSET: usize = 1;

#[macro_export]
macro_rules! metadata_seeds {
    ($mint:expr) => {{
        let path = vec!["metadata".as_bytes(), $crate::ID.as_ref(), $mint.as_ref()];
        let (_, bump) = Pubkey::find_program_address(&path, &$crate::ID);
        &[
            "metadata".as_bytes(),
            $crate::ID.as_ref(),
            $mint.as_ref(),
            &[bump],
        ]
    }};
}

#[repr(C)]
#[cfg_attr(feature = "serde-feature", derive(Serialize, Deserialize))]
#[derive(Clone, BorshSerialize, Debug, PartialEq, Eq, ShankAccount)]
pub struct Metadata {
    /// Account discriminator.
    pub key: Key,
    /// Address of the update authority.
    #[cfg_attr(feature = "serde-feature", serde(with = "As::<DisplayFromStr>"))]
    pub update_authority: Pubkey,
    /// Address of the mint.
    #[cfg_attr(feature = "serde-feature", serde(with = "As::<DisplayFromStr>"))]
    pub mint: Pubkey,
    /// Asset data.
    pub data: Data,
    // Immutable, once flipped, all sales of this metadata are considered secondary.
    pub primary_sale_happened: bool,
    // Whether or not the data struct is mutable, default is not
    pub is_mutable: bool,
    /// Since we cannot easily change Metadata, we add the new DataV2 fields here at the end.
    pub token_standard: Option<TokenStandard>,
    /// Collection
    pub collection: Option<Collection>,
    /// Collection Details
    pub collection_details: Option<CollectionDetails>,
    /// Uses
    pub uses: Option<Uses>,
}
