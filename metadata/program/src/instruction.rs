use borsh::{BorshDeserialize, BorshSerialize};

#[derive(BorshDeserialize, BorshSerialize)]
pub enum TokenInstruction {
    Initialize {
        name: String,
        symbol: String,
        uri: String,
    },
    Update {
        name: String,
        symbol: String,
        uri: String,
    },
}
