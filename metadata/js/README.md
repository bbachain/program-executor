# @bbachain/spl-token-metadata

BBAChain JavaScript SDK for interacting with a Token Metadata Program on BBAChain.

This library supports:
- Initializing token metadata
- Updating token metadata
- Reading token metadata

> Compatible with SPL Token standard and deployed custom program at:  
> `metabUBuFKTWPWAAARaQdNXUH6Sxk5tFGQjGEgWCvaX`

---

## 📦 Installation

```bash
npm install @bbachain/spl-token-metadata
```
---

## 🚀 Usage

### 🧱 Initialize metadata

```ts
import {
  initializeMetadata
} from "@bbachain/spl-token-metadata";
import {
  Connection,
  Keypair,
  PublicKey,
  clusterApiUrl
} from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("testnet"));
const payer = Keypair.generate(); // Or load from file
const mint = new PublicKey("YourMintAddressHere");

await initializeMetadata(
  connection,
  payer,
  mint,
  "My Token",
  "MTK",
  "https://example.com/metadata.json"
);
```

---

### ✏️ Update metadata

```ts
import { updateMetadata } from "@bbachain/spl-token-metadata";

await updateMetadata(
  connection,
  payer,
  mint,
  "New Token Name",
  "NTK",
  "https://example.com/new-uri.json"
);
```

---

### 🔍 Read metadata

```ts
import { readMetadata } from "@bbachain/spl-token-metadata";

const metadata = await readMetadata(connection, mint);
if (metadata) {
  console.log("Name:", metadata.name);
  console.log("Symbol:", metadata.symbol);
  console.log("URI:", metadata.uri);
}
```

---

## 🔧 API Reference

### `initializeMetadata(connection, payer, mint, name, symbol, uri)`

Creates the metadata account for a token mint (PDA). Only runs once per mint.

### `updateMetadata(connection, payer, mint, name, symbol, uri)`

Updates existing metadata. Only the authority set during initialization can update.

### `readMetadata(connection, mint): TokenMetadata | null`

Fetches and deserializes the on-chain metadata.

---

## 🧠 Notes

- This library uses **Borsh** for serialization (compatible with the Rust program).
- Metadata is stored in a PDA derived from `[b"metadata", mint]`.
- Compatible with any Solana cluster, including BBAChain (mainnet, testnet and localnet).

---

## 🪪 License

MIT © BBAChain Contributors
