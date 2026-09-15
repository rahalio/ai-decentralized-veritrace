#!/usr/bin/env node
/**
 * Bundle every Redocly API to src/.bundled/{name}.json (+ openapi.yaml companion).
 */
import { spawnSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const bundled = join(root, 'src', '.bundled');
mkdirSync(bundled, { recursive: true });

const domains = [
  'identity',
  'spaces',
  'blocks',
  'commitments',
  'consents',
  'verifications',
  'exports',
  'adapters',
];

for (const name of domains) {
  for (const [ext, out] of [
    ['yaml', join(bundled, `${name}.openapi.yaml`)],
    ['json', join(bundled, `${name}.json`)],
  ]) {
    const r = spawnSync(
      'npx',
      ['--yes', '@redocly/cli', 'bundle', name, '--output', out],
      { cwd: root, stdio: 'inherit', shell: process.platform === 'win32' }
    );
    if (r.status !== 0) {
      console.error(`Failed bundling ${name} (${ext})`);
      process.exit(r.status ?? 1);
    }
  }
}

console.log(`Bundled ${domains.length} domains → src/.bundled/`);
