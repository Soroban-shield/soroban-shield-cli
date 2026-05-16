import path from 'node:path';
import { writeFile, ensureDir } from '../utils/fs.js';
import { render } from '../utils/template.js';
import { logger } from '../utils/logger.js';
import { ALL_MODULES, ShieldModule } from '../types/modules.js';
import fs from 'node:fs';

function loadTemplate(rel: string): string {
  return fs.readFileSync(new URL(rel, import.meta.url), 'utf8');
}

const CARGO_TEMPLATE = loadTemplate('../templates/project/Cargo.toml.hbs');
const LIB_TEMPLATE = loadTemplate('../templates/project/lib.rs.hbs');

export interface InitOptions {
  name: string;
  modules?: ShieldModule[];
  outDir?: string;
}

export function initCommand(opts: InitOptions): void {
  const modules = opts.modules ?? (['ownable', 'pausable'] as ShieldModule[]);
  const dir = path.resolve(opts.outDir ?? opts.name);
  const ctx = { projectName: opts.name, contractName: opts.name, modules };
  writeFile(path.join(dir, 'Cargo.toml'), render(CARGO_TEMPLATE, ctx));
  ensureDir(path.join(dir, 'src'));
  writeFile(path.join(dir, 'src/lib.rs'), render(LIB_TEMPLATE, ctx));
  for (const mod of modules) {
    if (!ALL_MODULES.includes(mod)) continue;
    const tpl = loadTemplate(`../templates/modules/${mod}.rs.hbs`);
    writeFile(path.join(dir, 'src', `${mod}.rs`), render(tpl, ctx));
  }
  logger.success(`Scaffolded project at ${dir} with modules: ${modules.join(', ')}`);
}
