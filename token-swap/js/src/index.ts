import { PublicKey } from '@bbachain/web3.js';
export * from './accounts';
export * from './errors';
export * from './instructions';
export * from './types';
export * from './helpers';

/**
 * Program address
 *
 * @category constants
 */
export const PROGRAM_ADDRESS = 'SwapD4hpSrcB23e4RGdXPBdNzgXoFGaTEa1ZwoouotX';

/**
 * Program public key
 *
 * @category constants
 */
export const PROGRAM_ID = new PublicKey(PROGRAM_ADDRESS);
