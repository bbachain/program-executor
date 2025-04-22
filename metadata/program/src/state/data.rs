use super::*;

#[repr(C)]
#[cfg_attr(feature = "serde-feature", derive(Serialize, Deserialize))]
#[derive(BorshSerialize, BorshDeserialize, PartialEq, Eq, Debug, Clone)]
pub struct Data {
    /// The name of the asset
    pub name: String,

    /// The symbol for the asset
    pub symbol: String,

    /// URI pointing to JSON representing the asset
    pub uri: String,

    /// Royalty basis points that goes to creators in secondary sales (0-10000)
    pub seller_fee_basis_points: u16,

    /// Array of creators, optional
    pub creators: Option<Vec<Creator>>,

    /// Collection
    pub collection: Option<Collection>,

    /// Uses
    pub uses: Option<Uses>,
}
