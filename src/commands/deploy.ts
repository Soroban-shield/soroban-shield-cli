import { soroban } from '../utils/soroban.js';
import { getNetwork, Network } from '../utils/network.js';
import { logger } from '../utils/logger.js';

export interface DeployOptions {
  wasm: string;
  network: Network;
  alias?: string;
}

export function deployCommand(opts: DeployOptions): void {
  const net = getNetwork(opts.network);
  logger.info(`Deploying to ${net.name} (${net.rpcUrl})`);
  const out = soroban(['contract', 'deploy', '--wasm', opts.wasm, '--network', opts.network]);
  logger.success(`Deployed: ${out.trim()}`);
}
