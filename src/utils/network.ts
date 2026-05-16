export type Network = 'testnet' | 'mainnet' | 'local';

export interface NetworkConfig {
  name: Network;
  rpcUrl: string;
  networkPassphrase: string;
}

export const NETWORKS: Record<Network, NetworkConfig> = {
  testnet: {
    name: 'testnet',
    rpcUrl: 'https://soroban-testnet.stellar.org',
    networkPassphrase: 'Test SDF Network ; September 2015',
  },
  mainnet: {
    name: 'mainnet',
    rpcUrl: 'https://soroban-mainnet.stellar.org',
    networkPassphrase: 'Public Global Stellar Network ; September 2015',
  },
  local: {
    name: 'local',
    rpcUrl: 'http://localhost:8000/soroban/rpc',
    networkPassphrase: 'Standalone Network ; February 2017',
  },
};

export function getNetwork(name: Network): NetworkConfig {
  return NETWORKS[name];
}
