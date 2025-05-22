import {Account, Connection} from '@bbachain/web3.js';

/**
 * Create a new system account and airdrop it some daltons
 *
 * @private
 */
export async function newSystemAccountWithAirdrop(
  connection: Connection,
  daltons: number = 1,
): Promise<Account> {
  const account = new Account();
  await connection.requestAirdrop(account.publicKey, daltons);
  return account;
}
