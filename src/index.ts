#!/usr/bin/env node
import { initCommand } from './commands/init.js';
import { auditCommand } from './commands/audit.js';
import { deployCommand } from './commands/deploy.js';
import { listCommand } from './commands/list.js';
import { upgradeCommand } from './commands/upgrade.js';

const VERSION = '0.1.0';
const [,, cmd, ...args] = process.argv;

if (cmd === '--version' || cmd === '-v') {
  console.log(VERSION);
  process.exit(0);
}

switch (cmd) {
  case 'init':
    initCommand({ name: args[0] ?? 'my-contract', modules: ['ownable', 'pausable'] });
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
  case 'help':
  case undefined:
    console.log(`soroban-shield-cli v${VERSION}
Usage: shield <command> [args]

Commands:
  init <name>       Scaffold a new project
  audit <path>      Run security audit
  deploy <wasm>     Deploy contract
  list              List modules
  upgrade <id> <wasm>  Upgrade proxy contract`);
    break;
  default:
    console.error(`Unknown command: ${cmd}`);
    process.exit(1);
}
