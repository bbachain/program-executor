import {Account, Connection} from '@bbachain/web3.js';

import {sleep} from './sleep';

export async function newAccountWithLamports(
  connection: Connection,
  daltons: number = 1000000,
): Promise<Account> {
  const account = new Account();

  let retries = 30;
  await connection.requestAirdrop(account.publicKey, daltons);
  for (;;) {
    await sleep(500);
    if (daltons == (await connection.getBalance(account.publicKey))) {
      return account;
    }
    if (--retries <= 0) {
      break;
    }
  }
  throw new Error(`Airdrop of ${daltons} failed`);
}
