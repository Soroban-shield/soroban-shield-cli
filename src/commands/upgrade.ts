import { soroban } from '../utils/soroban.js';
import { Network } from '../utils/network.js';
import { logger } from '../utils/logger.js';

export interface UpgradeOptions {
  contractId: string;
  wasm: string;
  network: Network;
}

export function upgradeCommand(opts: UpgradeOptions): void {
  logger.info(`Upgrading contract ${opts.contractId}`);
  soroban([
    'contract',
    'invoke',
    '--id',
    opts.contractId,
    '--network',
    opts.network,
    '--',
    'upgrade',
    '--wasm',
    opts.wasm,
  ]);
  logger.success('Upgrade submitted');
}
