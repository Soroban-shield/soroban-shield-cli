import { execSync } from 'node:child_process';

export function soroban(args: string[]): string {
  return execSync(`soroban ${args.join(' ')}`, { encoding: 'utf8' });
}

export function buildWasm(projectDir: string): void {
  execSync('cargo build --target wasm32-unknown-unknown --release', {
    cwd: projectDir,
    stdio: 'inherit',
  });
}
