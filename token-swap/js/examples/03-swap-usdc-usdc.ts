/**
 * USDT/USDC Token Swap Example
 *
 * This example demonstrates:
 * 1. Setup connection to BBAChain testnet
 * 2. Create and initialize USDT/USDC liquidity pool
 * 3. Execute swap USDT → USDC
 * 4. Execute swap USDC → USDT
 * 5. Check balance before and after each swap
 */

import {
  Connection,
  Keypair,
  PublicKey,
  Transaction,
  SystemProgram,
  sendAndConfirmTransaction,
  BBA_DALTON_UNIT,
} from '@bbachain/web3.js';
import {
  createSwapInstruction,
  createInitializeInstruction,
  createZeroFees, // Use zero fees for testing
  createConstantProductCurve,
  PROGRAM_ID as TOKEN_SWAP_PROGRAM_ID,
} from '../src';
import {
  createMint,
  mintTo,
  TOKEN_PROGRAM_ID,
  createInitializeAccountInstruction,
  createSetAuthorityInstruction,
  AuthorityType,
  getAccount,
  createApproveInstruction,
} from '@bbachain/spl-token';
import BN from 'bn.js';

/**
 * Helper function to calculate expected output using constant product formula
 * Formula: (amountIn * reserveOut) / (reserveIn + amountIn)
 */
function calculateExpectedOutput(
  amountIn: number,
  reserveIn: number,
  reserveOut: number
): number {
  return (amountIn * reserveOut) / (reserveIn + amountIn);
}

// Connect to BBAChain
const connection = new Connection(
  'http://localhost:8899', // Replace with your BBAChain testnet RPC endpoint
  'confirmed'
);

/**
 * Helper function to create token account manually
 */
async function createTokenAccountManual(
  connection: Connection,
  payer: Keypair,
  mint: PublicKey,
  owner: PublicKey
): Promise<PublicKey> {
  const tokenAccount = Keypair.generate();

  // Get minimum balance for token account
  const tokenAccountSpace = 165; // Standard token account size
  const rentExemptAmount = await connection.getMinimumBalanceForRentExemption(
    tokenAccountSpace
  );

  // Create account instruction
  const createAccountIx = SystemProgram.createAccount({
    fromPubkey: payer.publicKey,
    newAccountPubkey: tokenAccount.publicKey,
    daltons: rentExemptAmount,
    space: tokenAccountSpace,
    programId: TOKEN_PROGRAM_ID,
  });

  // Initialize token account instruction
  const initAccountIx = createInitializeAccountInstruction(
    tokenAccount.publicKey,
    mint,
    owner
  );

  // Send transaction
  const transaction = new Transaction().add(createAccountIx, initAccountIx);
  await sendAndConfirmTransaction(
    connection,
    transaction,
    [payer, tokenAccount],
    { commitment: 'confirmed' }
  );

  return tokenAccount.publicKey;
}

/**
 * Create USDT/USDC liquidity pool
 */
async function createUSDTUSDCPool(payer: Keypair) {
  console.log('\n=== Create USDT/USDC Liquidity Pool ===');

  // Create mint for USDT and USDC (for testing - in reality would use existing mints)
  const usdtMint = await createMint(
    connection,
    payer,
    payer.publicKey,
    null,
    6 // USDT has 6 decimals
  );

  const usdcMint = await createMint(
    connection,
    payer,
    payer.publicKey,
    null,
    6 // USDC has 6 decimals
  );

  console.log('USDT Mint:', usdtMint.toBase58());
  console.log('USDC Mint:', usdcMint.toBase58());

  // Create pool mint for LP tokens
  const poolMint = await createMint(
    connection,
    payer,
    payer.publicKey,
    null,
    6
  );

  // Create token swap account
  const tokenSwapAccount = Keypair.generate();

  // Derive swap authority PDA
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [swapAuthority, bumpSeed] = await PublicKey.findProgramAddress(
    [tokenSwapAccount.publicKey.toBuffer()],
    TOKEN_SWAP_PROGRAM_ID
  );

  console.log('Token Swap Account:', tokenSwapAccount.publicKey.toBase58());
  console.log('Swap Authority:', swapAuthority.toBase58());

  // Transfer pool mint authority to swap authority
  const setAuthorityIx = createSetAuthorityInstruction(
    poolMint,
    payer.publicKey,
    AuthorityType.MintTokens,
    swapAuthority
  );

  await sendAndConfirmTransaction(
    connection,
    new Transaction().add(setAuthorityIx),
    [payer]
  );

  // Create pool token accounts (owned by swap authority)
  const usdtPoolAccount = await createTokenAccountManual(
    connection,
    payer,
    usdtMint,
    swapAuthority
  );

  const usdcPoolAccount = await createTokenAccountManual(
    connection,
    payer,
    usdcMint,
    swapAuthority
  );

  // Create fee account and user pool account
  const poolFeeAccount = await createTokenAccountManual(
    connection,
    payer,
    poolMint,
    payer.publicKey
  );

  const userPoolAccount = await createTokenAccountManual(
    connection,
    payer,
    poolMint,
    payer.publicKey
  );

  // Mint tokens to pool for initialization
  const initialUSDTAmount = 10000 * 1e6; // 10,000 USDT
  const initialUSDCAmount = 10000 * 1e6; // 10,000 USDC

  await mintTo(
    connection,
    payer,
    usdtMint,
    usdtPoolAccount,
    payer,
    initialUSDTAmount
  );

  await mintTo(
    connection,
    payer,
    usdcMint,
    usdcPoolAccount,
    payer,
    initialUSDCAmount
  );

  console.log('✅ Minted tokens to pool');

  // Initialize pool
  const fees = createZeroFees();
  const swapCurve = createConstantProductCurve();

  const swapAccountSpace = 324;
  const createAccountIx = SystemProgram.createAccount({
    fromPubkey: payer.publicKey,
    newAccountPubkey: tokenSwapAccount.publicKey,
    daltons: await connection.getMinimumBalanceForRentExemption(
      swapAccountSpace
    ),
    space: swapAccountSpace,
    programId: TOKEN_SWAP_PROGRAM_ID,
  });

  const initializeIx = createInitializeInstruction(
    {
      tokenSwap: tokenSwapAccount.publicKey,
      authority: swapAuthority,
      tokenA: usdtPoolAccount,
      tokenB: usdcPoolAccount,
      poolMint: poolMint,
      feeAccount: poolFeeAccount,
      destination: userPoolAccount,
      tokenProgram: TOKEN_PROGRAM_ID,
    },
    { fees, swapCurve }
  );

  const initTx = new Transaction().add(createAccountIx, initializeIx);
  const signature = await sendAndConfirmTransaction(
    connection,
    initTx,
    [payer, tokenSwapAccount],
    { commitment: 'confirmed' }
  );

  console.log('✅ Pool initialized successfully!');
  console.log('Signature:', signature);

  return {
    tokenSwapAccount: tokenSwapAccount.publicKey,
    swapAuthority,
    usdtMint,
    usdcMint,
    poolMint,
    usdtPoolAccount,
    usdcPoolAccount,
    poolFeeAccount,
    userPoolAccount,
  };
}

/**
 * Execute swap USDT → USDC
 */
async function swapUSDTtoUSDC(
  payer: Keypair,
  poolInfo: any,
  amount: number // Amount in USDT (6 decimals)
) {
  console.log('\n=== Execute USDT → USDC Swap ===');

  // Create user token accounts
  const userUSDTAccount = await createTokenAccountManual(
    connection,
    payer,
    poolInfo.usdtMint,
    payer.publicKey
  );

  const userUSDCAccount = await createTokenAccountManual(
    connection,
    payer,
    poolInfo.usdcMint,
    payer.publicKey
  );

  // Mint USDT for user to test
  const usdtAmount = amount * 1e6; // Convert to smallest unit
  await mintTo(
    connection,
    payer,
    poolInfo.usdtMint,
    userUSDTAccount,
    payer,
    usdtAmount
  );

  console.log(`✅ Minted ${amount} USDT for user`);

  // Check balance before swap
  const usdtBalanceBefore = await getAccount(connection, userUSDTAccount);
  const usdcBalanceBefore = await getAccount(connection, userUSDCAccount);

  console.log('Balance before swap:');
  console.log(`USDT: ${Number(usdtBalanceBefore.amount) / 1e6}`);
  console.log(`USDC: ${Number(usdcBalanceBefore.amount) / 1e6}`);

  // Approve for swap program to transfer tokens
  const approveIx = createApproveInstruction(
    userUSDTAccount,
    payer.publicKey, // delegate
    payer.publicKey, // owner
    usdtAmount
  );

  // Create swap instruction
  const expectedOutput = calculateExpectedOutput(amount, 10000, 10000); // Pool has 10k:10k
  const minimumAmountOut = Math.floor(expectedOutput * 0.95 * 1e6); // 5% slippage from expected

  console.log(`Expected output: ${expectedOutput.toFixed(6)} USDC`);
  console.log(
    `Minimum amount out (with 5% slippage): ${minimumAmountOut / 1e6} USDC`
  );

  const swapIx = createSwapInstruction(
    {
      tokenSwap: poolInfo.tokenSwapAccount,
      authority: poolInfo.swapAuthority,
      userTransferAuthority: payer.publicKey,
      source: userUSDTAccount,
      swapSource: poolInfo.usdtPoolAccount,
      swapDestination: poolInfo.usdcPoolAccount,
      destination: userUSDCAccount,
      poolMint: poolInfo.poolMint,
      feeAccount: poolInfo.poolFeeAccount,
      tokenProgram: TOKEN_PROGRAM_ID,
    },
    {
      amountIn: new BN(usdtAmount),
      minimumAmountOut: new BN(minimumAmountOut),
    }
  );

  // Send swap transaction
  const swapTx = new Transaction().add(approveIx, swapIx);
  const swapSignature = await sendAndConfirmTransaction(
    connection,
    swapTx,
    [payer],
    { commitment: 'confirmed' }
  );

  console.log('✅ Swap successful!');
  console.log('Swap signature:', swapSignature);

  // Check balance after swap
  const usdtBalanceAfter = await getAccount(connection, userUSDTAccount);
  const usdcBalanceAfter = await getAccount(connection, userUSDCAccount);

  console.log('\nBalance after swap:');
  console.log(`USDT: ${Number(usdtBalanceAfter.amount) / 1e6}`);
  console.log(`USDC: ${Number(usdcBalanceAfter.amount) / 1e6}`);

  const usdtSpent =
    Number(usdtBalanceBefore.amount - usdtBalanceAfter.amount) / 1e6;
  const usdcReceived =
    Number(usdcBalanceAfter.amount - usdcBalanceBefore.amount) / 1e6;

  console.log(`\n📊 Swap Result:`);
  console.log(`Swapped: ${usdtSpent} USDT`);
  console.log(`Received: ${usdcReceived} USDC`);
  console.log(`Rate: 1 USDT = ${(usdcReceived / usdtSpent).toFixed(4)} USDC`);

  return { userUSDTAccount, userUSDCAccount };
}

/**
 * Execute swap USDC → USDT
 */
async function swapUSDCtoUSDT(
  payer: Keypair,
  poolInfo: any,
  userAccounts: any,
  amount: number // Amount in USDC (6 decimals)
) {
  console.log('\n=== Execute USDC → USDT Swap ===');

  // Mint more USDC for user to test
  const usdcAmount = amount * 1e6;
  await mintTo(
    connection,
    payer,
    poolInfo.usdcMint,
    userAccounts.userUSDCAccount,
    payer,
    usdcAmount
  );

  console.log(`✅ Minted ${amount} USDC for user`);

  // Check balance before swap
  const usdtBalanceBefore = await getAccount(
    connection,
    userAccounts.userUSDTAccount
  );
  const usdcBalanceBefore = await getAccount(
    connection,
    userAccounts.userUSDCAccount
  );

  console.log('Balance before swap:');
  console.log(`USDT: ${Number(usdtBalanceBefore.amount) / 1e6}`);
  console.log(`USDC: ${Number(usdcBalanceBefore.amount) / 1e6}`);

  // Approve for swap program to transfer tokens
  const approveIx = createApproveInstruction(
    userAccounts.userUSDCAccount,
    payer.publicKey,
    payer.publicKey,
    usdcAmount
  );

  // Create swap instruction (note: source/destination swapped)
  // Note: Need to calculate pool state after first swap accurately
  // After swapping 100 USDT: Pool has ~10,100 USDT and ~9,901 USDC
  const usdtReserve = 10100; // Approximate after first swap
  const usdcReserve = 9901; // Approximate after first swap
  const expectedOutput = calculateExpectedOutput(
    amount,
    usdcReserve,
    usdtReserve
  );
  const minimumAmountOut = Math.floor(expectedOutput * 0.95 * 1e6); // 5% slippage from expected

  console.log(`Expected output: ${expectedOutput.toFixed(6)} USDT`);
  console.log(
    `Minimum amount out (with 5% slippage): ${minimumAmountOut / 1e6} USDT`
  );

  const swapIx = createSwapInstruction(
    {
      tokenSwap: poolInfo.tokenSwapAccount,
      authority: poolInfo.swapAuthority,
      userTransferAuthority: payer.publicKey,
      source: userAccounts.userUSDCAccount,
      swapSource: poolInfo.usdcPoolAccount, // Swap from USDC pool
      swapDestination: poolInfo.usdtPoolAccount, // Swap to USDT pool
      destination: userAccounts.userUSDTAccount,
      poolMint: poolInfo.poolMint,
      feeAccount: poolInfo.poolFeeAccount,
      tokenProgram: TOKEN_PROGRAM_ID,
    },
    {
      amountIn: new BN(usdcAmount),
      minimumAmountOut: new BN(minimumAmountOut),
    }
  );

  // Send swap transaction
  const swapTx = new Transaction().add(approveIx, swapIx);
  const swapSignature = await sendAndConfirmTransaction(
    connection,
    swapTx,
    [payer],
    { commitment: 'confirmed' }
  );

  console.log('✅ Swap successful!');
  console.log('Swap signature:', swapSignature);

  // Check balance after swap
  const usdtBalanceAfter = await getAccount(
    connection,
    userAccounts.userUSDTAccount
  );
  const usdcBalanceAfter = await getAccount(
    connection,
    userAccounts.userUSDCAccount
  );

  console.log('\nBalance after swap:');
  console.log(`USDT: ${Number(usdtBalanceAfter.amount) / 1e6}`);
  console.log(`USDC: ${Number(usdcBalanceAfter.amount) / 1e6}`);

  const usdcSpent =
    Number(usdcBalanceBefore.amount - usdcBalanceAfter.amount) / 1e6;
  const usdtReceived =
    Number(usdtBalanceAfter.amount - usdtBalanceBefore.amount) / 1e6;

  console.log(`\n📊 Swap Result:`);
  console.log(`Swapped: ${usdcSpent} USDC`);
  console.log(`Received: ${usdtReceived} USDT`);
  console.log(`Rate: 1 USDC = ${(usdtReceived / usdcSpent).toFixed(4)} USDT`);
}

/**
 * Main function to run the entire demo
 */
async function main() {
  console.log('🚀 Start USDT/USDC Swap Demo on BBAChain Testnet\n');

  // Create keypair and airdrop
  const payer = Keypair.generate();
  console.log('Payer:', payer.publicKey.toBase58());

  console.log('💰 Requesting airdrop...');
  try {
    const airdropSignature = await connection.requestAirdrop(
      payer.publicKey,
      2 * BBA_DALTON_UNIT
    );
    await connection.confirmTransaction(airdropSignature);
    console.log('✅ Airdrop successful');
  } catch (error) {
    console.error('❌ Airdrop failed:', error);
    return;
  }

  try {
    // 1. Create liquidity pool
    const poolInfo = await createUSDTUSDCPool(payer);

    // 2. Execute USDT → USDC swap
    const userAccounts = await swapUSDTtoUSDC(payer, poolInfo, 100); // Swap 100 USDT

    // 3. Execute USDC → USDT swap
    await swapUSDCtoUSDT(payer, poolInfo, userAccounts, 50); // Swap 50 USDC

    console.log('\n🎉 Demo completed successfully!');
    console.log('\n📋 Pool Information:');
    console.log(`Pool Address: ${poolInfo.tokenSwapAccount.toBase58()}`);
    console.log(`USDT Mint: ${poolInfo.usdtMint.toBase58()}`);
    console.log(`USDC Mint: ${poolInfo.usdcMint.toBase58()}`);
  } catch (error) {
    console.error('\n❌ Error during execution:', error);

    // Add more error information for debugging
    if (error.logs) {
      console.log('Transaction logs:', error.logs);
    }
  }
}

// Run demo
if (require.main === module) {
  main()
    .then(() => {
      console.log('\n✅ Program completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n❌ Error:', error);
      process.exit(1);
    });
}

export { main, createUSDTUSDCPool, swapUSDTtoUSDC, swapUSDCtoUSDT };
