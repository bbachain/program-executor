# Token Swap JS Bindings

JavaScript/TypeScript bindings for the Solana Program Library (SPL) Token Swap program.

## Installation

```bash
npm install @bbachain/spl-token-swap
```

## Usage

### Creating a Token Swap

```typescript
import { 
  TokenSwap, 
  createInitializeInstruction,
  CurveType,
  Fees,
  SwapCurve 
} from '@bbachain/spl-token-swap';
import { Connection, PublicKey, Transaction } from '@bbachain/web3.js';

// Define fees structure
const fees: Fees = {
  tradeFeeNumerator: BigInt(25),        // 0.25% trade fee
  tradeFeeDenominator: BigInt(10000),
  ownerTradeFeeNumerator: BigInt(5),    // 0.05% owner fee
  ownerTradeFeeDenominator: BigInt(10000),
  ownerWithdrawFeeNumerator: BigInt(0),
  ownerWithdrawFeeDenominator: BigInt(0),
  hostFeeNumerator: BigInt(0),
  hostFeeDenominator: BigInt(0),
};

// Define swap curve (constant product like Uniswap)
const swapCurve: SwapCurve = {
  curveType: CurveType.ConstantProduct,
  calculator: new Array(32).fill(0), // 32 bytes for curve parameters
};

// Create initialize instruction
const initializeIx = createInitializeInstruction(
  {
    tokenSwap: tokenSwapAccount,
    authority: swapAuthority,
    tokenA: tokenAAccount,
    tokenB: tokenBAccount,
    poolMint: poolMint,
    feeAccount: feeAccount,
    destination: destinationAccount,
    tokenProgram: TOKEN_PROGRAM_ID,
  },
  { fees, swapCurve }
);
```

### Performing a Swap

```typescript
import { createSwapInstruction } from '@bbachain/spl-token-swap';

const swapIx = createSwapInstruction(
  {
    tokenSwap: tokenSwapAccount,
    authority: swapAuthority,
    userTransferAuthority: userAuthority,
    source: userSourceAccount,
    swapSource: poolTokenAAccount,
    swapDestination: poolTokenBAccount,
    destination: userDestinationAccount,
    poolMint: poolMint,
    feeAccount: feeAccount,
    tokenProgram: TOKEN_PROGRAM_ID,
    hostFeeAccount: hostFeeAccount, // Optional
  },
  {
    amountIn: BigInt(1000000),      // 1 token (6 decimals)
    minimumAmountOut: BigInt(950000), // Minimum 0.95 tokens out (slippage protection)
  }
);
```

### Adding Liquidity

```typescript
import { createDepositAllTokenTypesInstruction } from '@bbachain/spl-token-swap';

const depositIx = createDepositAllTokenTypesInstruction(
  {
    tokenSwap: tokenSwapAccount,
    authority: swapAuthority,
    userTransferAuthority: userAuthority,
    sourceA: userTokenAAccount,
    sourceB: userTokenBAccount,
    intoA: poolTokenAAccount,
    intoB: poolTokenBAccount,
    poolMint: poolMint,
    poolAccount: userPoolAccount,
    tokenProgram: TOKEN_PROGRAM_ID,
  },
  {
    poolTokenAmount: BigInt(1000000),     // Pool tokens to mint
    maximumTokenAAmount: BigInt(1000000), // Max token A to deposit
    maximumTokenBAmount: BigInt(1000000), // Max token B to deposit
  }
);
```

### Removing Liquidity

```typescript
import { createWithdrawAllTokenTypesInstruction } from '@bbachain/spl-token-swap';

const withdrawIx = createWithdrawAllTokenTypesInstruction(
  {
    tokenSwap: tokenSwapAccount,
    authority: swapAuthority,
    userTransferAuthority: userAuthority,
    poolMint: poolMint,
    source: userPoolAccount,
    fromA: poolTokenAAccount,
    fromB: poolTokenBAccount,
    userAccountA: userTokenAAccount,
    userAccountB: userTokenBAccount,
    feeAccount: feeAccount,
    tokenProgram: TOKEN_PROGRAM_ID,
  },
  {
    poolTokenAmount: BigInt(1000000),    // Pool tokens to burn
    minimumTokenAAmount: BigInt(950000), // Min token A to receive
    minimumTokenBAmount: BigInt(950000), // Min token B to receive
  }
);
```

### Reading Token Swap State

```typescript
const connection = new Connection('https://api.mainnet-beta.solana.com');

// Load token swap account
const tokenSwap = await TokenSwap.fromAccountAddress(
  connection,
  tokenSwapAccount
);

console.log('Token A:', tokenSwap.tokenA.toBase58());
console.log('Token B:', tokenSwap.tokenB.toBase58());
console.log('Pool Mint:', tokenSwap.poolMint.toBase58());
console.log('Trade Fee:', tokenSwap.fees.tradeFeeNumerator.toString(), '/', tokenSwap.fees.tradeFeeDenominator.toString());
console.log('Curve Type:', tokenSwap.swapCurve.curveType);
```

## Types

### CurveType

```typescript
enum CurveType {
  ConstantProduct = 0, // x * y = k (like Uniswap)
  ConstantPrice = 1,   // Fixed exchange rate
  Stable = 2,          // StableSwap curve
  Offset = 3,          // Offset curve
}
```

### Fees

```typescript
type Fees = {
  tradeFeeNumerator: bigint;       // Trade fee numerator
  tradeFeeDenominator: bigint;     // Trade fee denominator
  ownerTradeFeeNumerator: bigint;  // Owner fee numerator
  ownerTradeFeeDenominator: bigint; // Owner fee denominator
  ownerWithdrawFeeNumerator: bigint; // Owner withdraw fee numerator
  ownerWithdrawFeeDenominator: bigint; // Owner withdraw fee denominator
  hostFeeNumerator: bigint;        // Host fee numerator
  hostFeeDenominator: bigint;      // Host fee denominator
};
```

## Error Handling

The library includes comprehensive error types that match the Rust program:

```typescript
import { 
  ExceededSlippageError,
  InvalidInputError,
  CalculationFailureError,
  errorFromCode 
} from '@bbachain/spl-token-swap';

try {
  // Transaction execution
} catch (error) {
  const programError = errorFromCode(error.code);
  if (programError instanceof ExceededSlippageError) {
    console.log('Swap failed due to slippage');
  }
}
```

## Program Address

The Token Swap program ID: `SwapD4hpSrcB23e4RGdXPBdNzgXoFGaTEa1ZwoouotX`

## License

Apache-2.0
