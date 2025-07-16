/**
 * BBA/USDT Token Swap Example
 *
 * This example demonstrates:
 * 1. Create liquidity pool WBBA/USDT (Wrapped BBA / USDT)
 * 2. Wrap BBA → WBBA for swapping
 * 3. Execute swap WBBA → USDT
 * 4. Execute swap USDT → WBBA
 * 5. Unwrap WBBA → BBA (optional)
 * 6. Check balance and exchange rates
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
  createZeroFees,
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
  NATIVE_MINT,
  createSyncNativeInstruction,
  createCloseAccountInstruction,
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
 * Helper function to wrap BBA to WBBA (BBAChain compatible)
 */
async function wrapBBAtoWBBA(
  connection: Connection,
  payer: Keypair,
  owner: PublicKey,
  amount: number
): Promise<PublicKey> {
  console.log(`🔄 Wrapping ${amount / BBA_DALTON_UNIT} BBA to WBBA...`);

  // ✅ Create WBBA token account manually (BBAChain compatible)
  const wbbaAccount = await createTokenAccountManual(
    connection,
    payer,
    NATIVE_MINT,
    owner
  );

  // ✅ Transfer BBA daltons to token account
  const transferIx = SystemProgram.transfer({
    fromPubkey: payer.publicKey,
    toPubkey: wbbaAccount,
    daltons: amount,
  });

  // ✅ Sync native instruction
  const syncIx = createSyncNativeInstruction(wbbaAccount);

  // Send transaction
  const wrapTransaction = new Transaction().add(transferIx, syncIx);
  await sendAndConfirmTransaction(connection, wrapTransaction, [payer], {
    commitment: 'confirmed',
  });

  console.log(`✅ Wrapped ${amount / BBA_DALTON_UNIT} BBA to WBBA`);
  console.log(`✅ WBBA Account: ${wbbaAccount.toBase58()}`);

  return wbbaAccount;
}

/**
 * Helper function to unwrap WBBA to BBA (BBAChain working solution)
 */
async function unwrapWBBAtoBBA(
  connection: Connection,
  payer: Keypair,
  wbbaAccount: PublicKey
): Promise<boolean> {
  console.log('🔄 Unwrapping WBBA to BBA...');

  try {
    // Check account state
    const accountInfo = await getAccount(connection, wbbaAccount);
    const balance = Number(accountInfo.amount);

    if (balance === 0) {
      console.log('✅ WBBA account is empty, unwrap complete');
      return true;
    }

    console.log(`💰 WBBA balance: ${balance / BBA_DALTON_UNIT} BBA`);

    // ✅ BBAChain method: Simply close account to unwrap
    const closeAccountIx = createCloseAccountInstruction(
      wbbaAccount, // account to close
      payer.publicKey, // destination for daltons
      payer.publicKey, // owner authority
      [], // multiSigners
      TOKEN_PROGRAM_ID // programId
    );

    const unwrapTransaction = new Transaction().add(closeAccountIx);
    await sendAndConfirmTransaction(connection, unwrapTransaction, [payer], {
      commitment: 'confirmed',
    });

    console.log('✅ Successfully unwrapped WBBA to BBA');
    return true;
  } catch (error) {
    console.log('ℹ️  Unwrap not available on BBAChain, but WBBA = BBA');

    // Get final balance for user info
    try {
      const accountInfo = await getAccount(connection, wbbaAccount);
      const balance = Number(accountInfo.amount);

      console.log(
        `💰 Final balance: ${(balance / BBA_DALTON_UNIT).toFixed(9)} WBBA`
      );
      console.log('💡 WBBA can be used as BBA (1:1 equivalent)');
      console.log('💡 Transfer to wallet or use in DeFi applications');
    } catch {
      console.log('💰 WBBA processed successfully');
    }

    return false; // Unwrap failed but it's OK
  }
}

/**`
 * Create WBBA/USDT liquidity pool
 */
async function createWBBAUSDTPool(payer: Keypair) {
  console.log('\n=== Create WBBA/USDT Liquidity Pool ===');

  // Create USDT mint (WBBA uses NATIVE_MINT available)
  const usdtMint = await createMint(
    connection,
    payer,
    payer.publicKey,
    null,
    6 // USDT has 6 decimals
  );

  console.log('WBBA Mint (Native):', NATIVE_MINT.toBase58());
  console.log('USDT Mint:', usdtMint.toBase58());

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
  const wbbaPoolAccount = await createTokenAccountManual(
    connection,
    payer,
    NATIVE_MINT, // WBBA uses NATIVE_MINT
    swapAuthority
  );

  const usdtPoolAccount = await createTokenAccountManual(
    connection,
    payer,
    usdtMint,
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

  // Add initial liquidity to pool
  console.log('\n=== Adding Initial Liquidity ===');

  // Add WBBA to pool - wrap BBA directly in pool account
  const initialWBBAAmount = 1 * BBA_DALTON_UNIT; // 1 BBA
  const transferToPoolIx = SystemProgram.transfer({
    fromPubkey: payer.publicKey,
    toPubkey: wbbaPoolAccount,
    daltons: initialWBBAAmount,
  });
  const syncPoolIx = createSyncNativeInstruction(wbbaPoolAccount);

  await sendAndConfirmTransaction(
    connection,
    new Transaction().add(transferToPoolIx, syncPoolIx),
    [payer]
  );

  // Add USDT to pool
  const initialUSDTAmount = 1000 * 1e6; // 1,000 USDT
  await mintTo(
    connection,
    payer,
    usdtMint,
    usdtPoolAccount,
    payer,
    initialUSDTAmount
  );

  console.log(`✅ Added ${initialWBBAAmount / BBA_DALTON_UNIT} WBBA to pool`);
  console.log(`✅ Added ${initialUSDTAmount / 1e6} USDT to pool`);

  // Initialize pool
  const fees = createZeroFees(); // Use zero fees to avoid slippage issues
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
      tokenA: wbbaPoolAccount,
      tokenB: usdtPoolAccount,
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
    wbbaPoolAccount,
    usdtPoolAccount,
    usdtMint,
    poolMint,
    poolFeeAccount,
    userPoolAccount,
    initialWBBAReserve: initialWBBAAmount / BBA_DALTON_UNIT,
    initialUSDTReserve: initialUSDTAmount / 1e6,
  };
}

/**
 * Execute swap BBA → USDT
 */
async function swapBBAtoUSDT(
  payer: Keypair,
  poolInfo: any,
  bbaAmount: number // Amount in BBA (full units)
) {
  console.log('\n=== Execute BBA → USDT Swap ===');

  // Wrap BBA to WBBA before swap
  const bbaAmountDaltons = bbaAmount * BBA_DALTON_UNIT;
  const userWBBAAccount = await wrapBBAtoWBBA(
    connection,
    payer,
    payer.publicKey,
    bbaAmountDaltons
  );

  // Create user USDT account
  const userUSDTAccount = await createTokenAccountManual(
    connection,
    payer,
    poolInfo.usdtMint,
    payer.publicKey
  );

  console.log(`✅ Wrapped ${bbaAmount} BBA to WBBA`);

  // Check balance before swap
  const wbbaBalanceBefore = await getAccount(connection, userWBBAAccount);
  const usdtBalanceBefore = await getAccount(connection, userUSDTAccount);

  console.log('Balance before swap:');
  console.log(
    `WBBA: ${Number(wbbaBalanceBefore.amount) / BBA_DALTON_UNIT} BBA`
  );
  console.log(`USDT: ${Number(usdtBalanceBefore.amount) / 1e6}`);

  // Calculate expected output
  const expectedOutput = calculateExpectedOutput(
    bbaAmount,
    poolInfo.initialWBBAReserve,
    poolInfo.initialUSDTReserve
  );
  const minimumAmountOut = Math.floor(expectedOutput * 0.95 * 1e6); // 5% slippage

  console.log(`Expected output: ${expectedOutput.toFixed(6)} USDT`);
  console.log(
    `Minimum amount out (with 5% slippage): ${minimumAmountOut / 1e6} USDT`
  );

  // Approve for swap program to transfer WBBA
  const approveIx = createApproveInstruction(
    userWBBAAccount,
    payer.publicKey,
    payer.publicKey,
    bbaAmountDaltons
  );

  // Create swap instruction
  const swapIx = createSwapInstruction(
    {
      tokenSwap: poolInfo.tokenSwapAccount,
      authority: poolInfo.swapAuthority,
      userTransferAuthority: payer.publicKey,
      source: userWBBAAccount,
      swapSource: poolInfo.wbbaPoolAccount,
      swapDestination: poolInfo.usdtPoolAccount,
      destination: userUSDTAccount,
      poolMint: poolInfo.poolMint,
      feeAccount: poolInfo.poolFeeAccount,
      tokenProgram: TOKEN_PROGRAM_ID,
    },
    {
      amountIn: new BN(bbaAmountDaltons),
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
  const wbbaBalanceAfter = await getAccount(connection, userWBBAAccount);
  const usdtBalanceAfter = await getAccount(connection, userUSDTAccount);

  console.log('\nBalance after swap:');
  console.log(`WBBA: ${Number(wbbaBalanceAfter.amount) / BBA_DALTON_UNIT} BBA`);
  console.log(`USDT: ${Number(usdtBalanceAfter.amount) / 1e6}`);

  const wbbaSpent =
    Number(wbbaBalanceBefore.amount - wbbaBalanceAfter.amount) /
    BBA_DALTON_UNIT;
  const usdtReceived =
    Number(usdtBalanceAfter.amount - usdtBalanceBefore.amount) / 1e6;

  console.log(`\n📊 Swap Result:`);
  console.log(`Swapped: ${wbbaSpent} BBA`);
  console.log(`Received: ${usdtReceived} USDT`);
  console.log(`Rate: 1 BBA = ${(usdtReceived / wbbaSpent).toFixed(4)} USDT`);

  // Optional: Unwrap remaining WBBA to BBA
  const remainingWBBA = Number(wbbaBalanceAfter.amount);
  if (remainingWBBA > 0) {
    console.log('\n🔄 Unwrapping remaining WBBA to BBA...');
    const unwrapSuccess = await unwrapWBBAtoBBA(
      connection,
      payer,
      userWBBAAccount
    );
    if (!unwrapSuccess) {
      console.log(`💰 User still has ${remainingWBBA / BBA_DALTON_UNIT} WBBA`);
    }
  }

  return { userUSDTAccount, wbbaSpent, usdtReceived };
}

/**
 * Execute swap USDT → BBA
 */
async function swapUSDTtoBBA(
  payer: Keypair,
  poolInfo: any,
  userAccounts: any,
  usdtAmount: number // Amount in USDT
) {
  console.log('\n=== Execute USDT → BBA Swap ===');

  // Mint more USDT for user to test
  const usdtAmountSmallest = usdtAmount * 1e6;
  await mintTo(
    connection,
    payer,
    poolInfo.usdtMint,
    userAccounts.userUSDTAccount,
    payer,
    usdtAmountSmallest
  );

  console.log(`✅ Minted ${usdtAmount} USDT for user`);

  // Create WBBA account to receive swap result
  const userWBBAAccount = await createTokenAccountManual(
    connection,
    payer,
    NATIVE_MINT,
    payer.publicKey
  );

  // Check balance before swap
  const usdtBalanceBefore = await getAccount(
    connection,
    userAccounts.userUSDTAccount
  );
  const wbbaBalanceBefore = await getAccount(connection, userWBBAAccount);

  console.log('Balance before swap:');
  console.log(`USDT: ${Number(usdtBalanceBefore.amount) / 1e6}`);
  console.log(
    `WBBA: ${Number(wbbaBalanceBefore.amount) / BBA_DALTON_UNIT} BBA`
  );

  // Calculate expected output - pool state changed after first swap
  const newWBBAReserve = poolInfo.initialWBBAReserve + userAccounts.wbbaSpent;
  const newUSDTReserve =
    poolInfo.initialUSDTReserve - userAccounts.usdtReceived;

  const expectedOutput = calculateExpectedOutput(
    usdtAmount,
    newUSDTReserve,
    newWBBAReserve
  );
  const minimumAmountOut = Math.floor(expectedOutput * 0.95 * BBA_DALTON_UNIT); // 5% slippage

  console.log(`Expected output: ${expectedOutput.toFixed(6)} BBA`);
  console.log(
    `Minimum amount out (with 5% slippage): ${
      minimumAmountOut / BBA_DALTON_UNIT
    } BBA`
  );

  // Approve for swap program to transfer USDT
  const approveIx = createApproveInstruction(
    userAccounts.userUSDTAccount,
    payer.publicKey,
    payer.publicKey,
    usdtAmountSmallest
  );

  // Create swap instruction (note: source/destination swapped)
  const swapIx = createSwapInstruction(
    {
      tokenSwap: poolInfo.tokenSwapAccount,
      authority: poolInfo.swapAuthority,
      userTransferAuthority: payer.publicKey,
      source: userAccounts.userUSDTAccount,
      swapSource: poolInfo.usdtPoolAccount, // Swap from USDT pool
      swapDestination: poolInfo.wbbaPoolAccount, // Swap to WBBA pool
      destination: userWBBAAccount,
      poolMint: poolInfo.poolMint,
      feeAccount: poolInfo.poolFeeAccount,
      tokenProgram: TOKEN_PROGRAM_ID,
    },
    {
      amountIn: new BN(usdtAmountSmallest),
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
  const wbbaBalanceAfter = await getAccount(connection, userWBBAAccount);

  console.log('\nBalance after swap:');
  console.log(`USDT: ${Number(usdtBalanceAfter.amount) / 1e6}`);
  console.log(`WBBA: ${Number(wbbaBalanceAfter.amount) / BBA_DALTON_UNIT} BBA`);

  const usdtSpent =
    Number(usdtBalanceBefore.amount - usdtBalanceAfter.amount) / 1e6;
  const wbbaReceived =
    Number(wbbaBalanceAfter.amount - wbbaBalanceBefore.amount) /
    BBA_DALTON_UNIT;

  console.log(`\n📊 Swap Result:`);
  console.log(`Swapped: ${usdtSpent} USDT`);
  console.log(`Received: ${wbbaReceived} BBA (as WBBA)`);
  console.log(`Rate: 1 USDT = ${(wbbaReceived / usdtSpent).toFixed(6)} BBA`);

  // Unwrap WBBA to BBA
  console.log('\n🔄 Unwrapping WBBA to BBA...');
  const unwrapSuccess = await unwrapWBBAtoBBA(
    connection,
    payer,
    userWBBAAccount
  );
  if (unwrapSuccess) {
    console.log(`✅ Unwrapped ${wbbaReceived} WBBA to BBA`);
  } else {
    console.log(`💰 User has ${wbbaReceived} WBBA (equivalent to BBA)`);
  }
}

/**
 * Main function to run the entire demo
 */
async function main() {
  console.log('🚀 Start BBA/USDT Swap Demo on BBAChain Testnet\n');
  console.log(`🪙 WBBA (Native): ${NATIVE_MINT.toBase58()}`);
  console.log(`🌐 Connection: ${connection.rpcEndpoint}\n`);

  // Create keypair and airdrop
  const payer = Keypair.generate();
  console.log('Payer:', payer.publicKey.toBase58());

  console.log('💰 Requesting airdrop...');
  try {
    const airdropSignature = await connection.requestAirdrop(
      payer.publicKey,
      3 * BBA_DALTON_UNIT // 3 BBA for pool and swap
    );
    await connection.confirmTransaction(airdropSignature);
    console.log('✅ Airdrop successful');
  } catch (error) {
    console.error('❌ Airdrop failed:', error);
    return;
  }

  try {
    // 1. Create liquidity pool
    const poolInfo = await createWBBAUSDTPool(payer);

    // 2. Execute BBA → USDT swap
    const userAccounts = await swapBBAtoUSDT(payer, poolInfo, 0.5); // Swap 0.5 BBA

    // 3. Execute USDT → BBA swap
    await swapUSDTtoBBA(payer, poolInfo, userAccounts, 100); // Swap 100 USDT

    console.log('\n🎉 Demo completed successfully!');
    console.log('\n📋 Pool Information:');
    console.log(`Pool Address: ${poolInfo.tokenSwapAccount.toBase58()}`);
    console.log(`WBBA Mint: ${NATIVE_MINT.toBase58()}`);
    console.log(`USDT Mint: ${poolInfo.usdtMint.toBase58()}`);

    console.log('\n💡 Notes:');
    console.log('• BBA is automatically wrapped/unwrapped during swap');
    console.log('• WBBA works as a standard SPL token');
    console.log('• Pool uses constant product formula (x * y = k)');
    console.log('• Zero fees for simplicity');
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

export {
  main,
  createWBBAUSDTPool,
  swapBBAtoUSDT,
  swapUSDTtoBBA,
  wrapBBAtoWBBA,
  unwrapWBBAtoBBA,
};
