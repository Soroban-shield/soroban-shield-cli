import { Network } from './network.js';

export function parseNetwork(value?: string): Network {
  if (value === 'mainnet' || value === 'testnet' || value === 'local') return value;
  return 'testnet';
}
