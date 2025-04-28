import { PublicKey } from '@bbachain/web3.js';
export * from './accounts';
export * from './errors';
export * from './instructions';
export * from './types';

/**
 * Program address
 *
 * @category constants
 */
export const PROGRAM_ADDRESS = 'meta9hXUUHmM7FT8haXiCVsw168kWb8UkFFhAWMEzim';

/**
 * Program public key
 *
 * @category constants
 */
export const PROGRAM_ID = new PublicKey(PROGRAM_ADDRESS);
