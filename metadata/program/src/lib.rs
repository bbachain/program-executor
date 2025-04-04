use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    msg,
    program_error::ProgramError,
    pubkey::Pubkey,
    sysvar::{rent::Rent, Sysvar},
    program::invoke_signed,
    system_instruction,
};
use serde::{Serialize, Deserialize};

// Define the metadata structure
#[derive(Serialize, Deserialize, Debug)]
struct TokenMetadata {
    logo: String,
    name: String,
    symbol: String,
    description: String,
    mint_address: String, // Token mint address
}

// Define instruction
#[derive(Debug)]
enum TokenInstruction {
    Initialize(TokenMetadata),
    Read,
}

// Function to deserialize instruction_data
fn unpack_instruction_data(instruction_data: &[u8]) -> Result<TokenInstruction, ProgramError> {
    if instruction_data.is_empty() {
        return Err(ProgramError::InvalidInstructionData);
    }
    match instruction_data[0] {
        0 => {
            let json_str = std::str::from_utf8(&instruction_data[1..])
                .map_err(|_| ProgramError::InvalidInstructionData)?;
            let metadata: TokenMetadata = serde_json::from_str(json_str)
                .map_err(|_| ProgramError::InvalidInstructionData)?;
            Ok(TokenInstruction::Initialize(metadata))
        }
        1 => Ok(TokenInstruction::Read),
        _ => Err(ProgramError::InvalidInstructionData),
    }
}

// Function to generate PDA
fn get_metadata_pda(program_id: &Pubkey, mint: &Pubkey) -> (Pubkey, u8) {
    Pubkey::find_program_address(&[b"metadata", mint.as_ref()], program_id)
}

// Define entrypoint
entrypoint!(process_instruction);

// Instruction processing function
pub fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    let instruction = unpack_instruction_data(instruction_data)?;

    // Get accounts
    let accounts_iter = &mut accounts.iter();
    let payer = next_account_info(accounts_iter)?; // Account paying the fee (KUG)
    let metadata_account = next_account_info(accounts_iter)?; // PDA account
    let mint = next_account_info(accounts_iter)?; // Token mint
    let rent_sysvar = next_account_info(accounts_iter)?; // Rent sysvar

    // Convert mint from Pubkey to String for checking
    let mint_pubkey = mint.key;

    match instruction {
        TokenInstruction::Initialize(metadata) => {
            // Check the mint_address in metadata
            if metadata.mint_address != mint_pubkey.to_string() {
                msg!("Mint address in metadata does not match!");
                return Err(ProgramError::InvalidArgument);
            }

            // Calculate PDA
            let (expected_pda, bump_seed) = get_metadata_pda(program_id, mint_pubkey);
            if metadata_account.key != &expected_pda {
                msg!("PDA does not match!");
                return Err(ProgramError::InvalidAccountData);
            }

            // Check if the account has already been initialized
            if metadata_account.daltons() > 0 {
                msg!("PDA has already been initialized!");
                return Err(ProgramError::AccountAlreadyInitialized);
            }

            // Serialize metadata
            let serialized_data = serde_json::to_vec(&metadata)
                .map_err(|_| ProgramError::InvalidAccountData)?;

            // Calculate daltons required for rent exemption
            let rent = Rent::from_account_info(rent_sysvar)?;
            let required_daltons = rent.minimum_balance(serialized_data.len());

            // Create PDA account using invoke_signed
            let create_account_ix = system_instruction::create_account(
                payer.key,
                metadata_account.key,
                required_daltons,
                serialized_data.len() as u64,
                program_id,
            );
            invoke_signed(
                &create_account_ix,
                &[payer.clone(), metadata_account.clone()],
                &[&[b"metadata", mint_pubkey.as_ref(), &[bump_seed]]],
            )?;

            // Write metadata to PDA
            let mut account_data = metadata_account.try_borrow_mut_data()?;
            account_data[0..serialized_data.len()].copy_from_slice(&serialized_data);
            msg!("Metadata initialized for mint: {}", metadata.mint_address);
        }
        TokenInstruction::Read => {
            // Calculate PDA
            let (expected_pda, _bump_seed) = get_metadata_pda(program_id, mint_pubkey);
            if metadata_account.key != &expected_pda {
                msg!("PDA does not match!");
                return Err(ProgramError::InvalidAccountData);
            }

            // Read data from account
            let account_data = metadata_account.try_borrow_data()?;
            if account_data.is_empty() {
                msg!("PDA has not been initialized!");
                return Err(ProgramError::UninitializedAccount);
            }

            // Deserialize metadata
            let metadata: TokenMetadata = serde_json::from_slice(&account_data)
                .map_err(|_| ProgramError::InvalidAccountData)?;
            msg!("Metadata: {:?}", metadata);
        }
    }

    Ok(())
}