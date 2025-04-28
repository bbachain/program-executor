use solana_program::program_error::ProgramError;

use crate::{error::MetadataError, state::Collection};

/// Checks whether the collection update is allowed or not based on the `verified` status.
pub fn assert_collection_update_is_valid(
    existing: &Option<Collection>,
    incoming: &Option<Collection>,
) -> Result<(), ProgramError> {
    let is_incoming_verified = if let Some(status) = incoming {
        status.verified
    } else {
        false
    };

    let is_existing_verified = if let Some(status) = existing {
        status.verified
    } else {
        false
    };

    let valid_update = if is_incoming_verified {
        // verified: can only update if the details match
        is_existing_verified && (existing.as_ref().unwrap().key == incoming.as_ref().unwrap().key)
    } else {
        // unverified: can only update if existing is unverified
        !is_existing_verified
    };

    if !valid_update {
        return Err(MetadataError::CollectionCannotBeVerifiedInThisInstruction.into());
    }

    Ok(())
}
