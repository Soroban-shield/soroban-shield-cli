import path from 'node:path';
import { writeFile } from '../utils/fs.js';
import { render } from '../utils/template.js';
import { logger } from '../utils/logger.js';
import fs from 'node:fs';

const CARGO_TEMPLATE = fs.readFileSync(
  new URL('../templates/project/Cargo.toml.hbs', import.meta.url),
  'utf8',
);
const LIB_TEMPLATE = fs.readFileSync(
  new URL('../templates/project/lib.rs.hbs', import.meta.url),
  'utf8',
);

export interface InitOptions {
  name: string;
  modules: string[];
  outDir?: string;
}

export function initCommand(opts: InitOptions): void {
  const dir = path.resolve(opts.outDir ?? opts.name);
  const ctx = { projectName: opts.name, contractName: opts.name, modules: opts.modules };
  writeFile(path.join(dir, 'Cargo.toml'), render(CARGO_TEMPLATE, ctx));
  writeFile(path.join(dir, 'src/lib.rs'), render(LIB_TEMPLATE, ctx));
  logger.success(`Scaffolded project at ${dir}`);
}
