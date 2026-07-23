// Shared Fractal boot/resolve helpers, factored out of scripts/verify-component.mjs
// so this skill's scripts can find a component's preview URLs and get a live
// Fractal server the same way `pnpm verify:component` does.
import { spawn, spawnSync } from 'node:child_process';
import { existsSync, readFileSync, globSync } from 'node:fs';
import path from 'node:path';

export const FRACTAL_PORT = process.env.CT_FRACTAL_PORT || '3000';
export const FRACTAL_URL = `http://localhost:${FRACTAL_PORT}`;

export function log(msg) {
  console.error(`[sonnet-a11y-audit] ${msg}`);
}

function run(cmd, args, opts = {}) {
  const result = spawnSync(cmd, args, { stdio: 'inherit', ...opts });
  return result.status === 0;
}

export function resolveComponentDir(root, nameArg) {
  const componentsDir = path.join(root, 'packages/core/src/components');
  const parts = nameArg.split('/');
  if (parts.length === 2) {
    const [category, name] = parts;
    const dir = path.join(componentsDir, category, name);
    if (existsSync(path.join(dir, `${name}.config.json`))) return { dir, name };
    throw new Error(`No config found at ${dir}/${name}.config.json`);
  }
  const name = parts[0];
  const matches = globSync(`*/${name}/${name}.config.json`, { cwd: componentsDir });
  if (matches.length === 0) {
    throw new Error(`Could not find ${name}.config.json under any category in ${componentsDir}`);
  }
  if (matches.length > 1) {
    throw new Error(`"${name}" is ambiguous (found in ${matches.join(', ')}) — pass category/name instead`);
  }
  return { dir: path.join(componentsDir, path.dirname(matches[0])), name };
}

export function loadVariantUrls(name, configPath) {
  const config = JSON.parse(readFileSync(configPath, 'utf8'));
  const urls = [{ variant: 'default', path: `/components/preview/${name}` }];
  for (const variant of config.variants ?? []) {
    urls.push({ variant: variant.name, path: `/components/preview/${name}--${variant.name}` });
  }
  return urls;
}

async function isServerUp() {
  try {
    const res = await fetch(FRACTAL_URL);
    return res.ok || res.status < 500;
  } catch {
    return false;
  }
}

async function waitForServer(timeoutMs = 30_000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (await isServerUp()) return true;
    await new Promise((r) => setTimeout(r, 500));
  }
  return false;
}

export function rebuild(root) {
  log('Rebuilding tokens...');
  if (!run('pnpm', ['build:tokens'], { cwd: root })) {
    throw new Error('pnpm build:tokens failed — fix the token build before auditing.');
  }
  log('Rebuilding core (tsc && vite build)...');
  if (!run('pnpm', ['build:core'], { cwd: root })) {
    log('pnpm build:core failed (tsc likely errored on something unrelated). Falling back to `vite build`.');
    if (!run('npx', ['vite', 'build'], { cwd: path.join(root, 'packages/core') })) {
      throw new Error('vite build also failed — cannot audit against stale dist/ct-core.js.');
    }
  }
}

/**
 * Ensures a Fractal server is reachable at FRACTAL_URL, starting one if needed.
 * Returns a teardown function — call it in a `finally` block. It's a no-op if
 * this call reused an already-running server (never kill a server you didn't start).
 */
export async function ensureFractalServer(root) {
  const alreadyRunning = await isServerUp();
  if (alreadyRunning) {
    log(`Fractal server already running on :${FRACTAL_PORT} — reusing it.`);
    return () => {};
  }
  log('Booting Fractal (node lab.cjs)...');
  const child = spawn('node', ['lab.cjs'], {
    cwd: path.join(root, 'packages/core'),
    detached: true,
    stdio: 'ignore',
    env: { ...process.env, CT_FRACTAL_PORT: FRACTAL_PORT },
  });
  child.unref();
  const up = await waitForServer();
  if (!up) {
    try { process.kill(-child.pid, 'SIGTERM'); } catch { /* already gone */ }
    throw new Error('Fractal server did not come up within 30s.');
  }
  return () => {
    log('Shutting down the Fractal process we started.');
    try { process.kill(-child.pid, 'SIGTERM'); } catch { /* already gone */ }
  };
}
