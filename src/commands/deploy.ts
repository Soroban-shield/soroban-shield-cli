import { soroban } from '../utils/soroban.js';
import { getNetwork, Network } from '../utils/network.js';
import { parseNetwork } from '../utils/flags.js';
import { logger } from '../utils/logger.js';

export interface DeployOptions {
  wasm: string;
  network?: string;
  alias?: string;
}

export function deployCommand(opts: DeployOptions): void {
  const network: Network = parseNetwork(opts.network);
  const net = getNetwork(network);
  logger.info(`Deploying to ${net.name} (${net.rpcUrl})`);
  const out = soroban(['contract', 'deploy', '--wasm', opts.wasm, '--network', network]);
  logger.success(`Deployed: ${out.trim()}`);
}
