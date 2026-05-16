export const MODULES = [
  { id: 'ownable', description: 'Single-owner with 2-step transfer' },
  { id: 'access_control', description: 'Role-based access control' },
  { id: 'pausable', description: 'Emergency pause circuit breaker' },
  { id: 'reentrancy_guard', description: 'Reentrancy protection' },
  { id: 'rate_limiter', description: 'Per-address rate limiting' },
  { id: 'multi_sig', description: 'N-of-M threshold proposals' },
  { id: 'upgradeable', description: 'WASM proxy upgrades' },
];

export function listCommand(): void {
  for (const m of MODULES) {
    console.log(`${m.id.padEnd(18)} ${m.description}`);
  }
}
