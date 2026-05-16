#!/usr/bin/env node
import { initCommand } from './commands/init.js';
import { auditCommand } from './commands/audit.js';
import { deployCommand } from './commands/deploy.js';
import { listCommand } from './commands/list.js';
import { upgradeCommand } from './commands/upgrade.js';

const [,, cmd, ...args] = process.argv;

switch (cmd) {
  case 'init':
    initCommand({ name: args[0] ?? 'my-contract', modules: ['ownable'] });
    break;
  case 'audit':
    process.exit(auditCommand(args[0] ?? './src'));
    break;
  case 'deploy':
    deployCommand({ wasm: args[0], network: 'testnet' });
    break;
  case 'list':
    listCommand();
    break;
  case 'upgrade':
    upgradeCommand({ contractId: args[0], wasm: args[1], network: 'testnet' });
    break;
  default:
    console.log('Usage: shield <init|audit|deploy|list|upgrade> [args]');
}
