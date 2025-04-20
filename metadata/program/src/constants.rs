/// A constant seed used for metadata-related operations.
/// This is a byte slice with the value `"metadata"`.
pub const METADATA_SEED: &[u8] = b"metadata";

/// The maximum allowed length for a name in the metadata.
/// This value is set to 32 characters.
pub const MAX_NAME_LEN: usize = 32;

/// The maximum allowed length for a symbol in the metadata.
/// This value is set to 10 characters.
pub const MAX_SYMBOL_LEN: usize = 10;

/// The maximum allowed length for a URI in the metadata.
/// This value is set to 200 characters.
pub const MAX_URI_LEN: usize = 200;
