#!/usr/bin/env node
/**
 * Automates the "Build & Visual Verification" step of component-addition-checklist.md:
 * rebuilds tokens/core, boots (or reuses) the Fractal server, screenshots every
 * variant of a component's preview, and dumps computed styles for a quick diff
 * against values sourced from civictheme.variables.css.
 *
 * Usage:
 *   node scripts/verify-component.mjs <component-name> [<component-name> ...]
 *   node scripts/verify-component.mjs ui/button
 *
 * Output: packages/core/.verify/<name>/*.png + a JSON report printed to stdout.
 */
import { chromium } from '@playwright/test';
import { spawn, spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, copyFileSync, globSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const CORE_DIR = path.join(ROOT, 'packages/core');
const COMPONENTS_DIR = path.join(CORE_DIR, 'src/components');
const FRACTAL_PORT = process.env.CT_FRACTAL_PORT || '3000';
const FRACTAL_URL = `http://localhost:${FRACTAL_PORT}`;

const COMPUTED_STYLE_PROPS = [
  'backgroundColor',
  'color',
  'padding',
  'borderRadius',
  'borderWidth',
  'borderColor',
  'fontFamily',
  'fontSize',
  'fontWeight',
  'letterSpacing',
  'opacity',
];

function log(msg) {
  console.error(`[verify-component] ${msg}`);
}

function run(cmd, args, opts = {}) {
  const result = spawnSync(cmd, args, { stdio: 'inherit', cwd: ROOT, ...opts });
  return result.status === 0;
}

function resolveComponentDir(nameArg) {
  const parts = nameArg.split('/');
  if (parts.length === 2) {
    const [category, name] = parts;
    const dir = path.join(COMPONENTS_DIR, category, name);
    if (existsSync(path.join(dir, `${name}.config.json`))) return { dir, name };
    throw new Error(`No config found at ${dir}/${name}.config.json`);
  }
  const name = parts[0];
  const matches = globSync(`*/${name}/${name}.config.json`, { cwd: COMPONENTS_DIR });
  if (matches.length === 0) {
    throw new Error(`Could not find ${name}.config.json under any category in ${COMPONENTS_DIR}`);
  }
  if (matches.length > 1) {
    throw new Error(`"${name}" is ambiguous (found in ${matches.join(', ')}) — pass category/name instead`);
  }
  return { dir: path.join(COMPONENTS_DIR, path.dirname(matches[0])), name };
}

function loadVariantUrls(name, configPath) {
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

function startFractal() {
  log('Booting Fractal (node lab.cjs)...');
  const child = spawn('node', ['lab.cjs'], {
    cwd: CORE_DIR,
    detached: true,
    stdio: 'ignore',
    env: { ...process.env, CT_FRACTAL_PORT: FRACTAL_PORT },
  });
  child.unref();
  return child;
}

function stopFractal(child) {
  if (!child) return;
  log('Shutting down the Fractal process we started.');
  try {
    process.kill(-child.pid, 'SIGTERM');
  } catch {
    // already gone
  }
}

function rebuild() {
  log('Rebuilding tokens...');
  if (!run('pnpm', ['build:tokens'])) {
    throw new Error('pnpm build:tokens failed — fix the token build before verifying visuals.');
  }

  log('Rebuilding core (tsc && vite build)...');
  if (!run('pnpm', ['build:core'])) {
    log('pnpm build:core failed (tsc likely errored on something unrelated). ' +
      'Falling back to a direct `vite build` so dist/ct-core.js is at least current.');
    if (!run('npx', ['vite', 'build'], { cwd: CORE_DIR })) {
      throw new Error('vite build also failed — cannot verify against stale dist/ct-core.js.');
    }
    copyFileSync(
      path.join(ROOT, 'packages/tokens/dist/variables.css'),
      path.join(CORE_DIR, 'dist/variables.css'),
    );
  }
}

async function verifyComponent(browser, name, dir) {
  const configPath = path.join(dir, `${name}.config.json`);
  const urls = loadVariantUrls(name, configPath);
  const tagName = `ct-${name}`;
  const outDir = path.join(CORE_DIR, '.verify', name);
  mkdirSync(outDir, { recursive: true });

  const page = await browser.newPage({ viewport: { width: 900, height: 500 } });
  const report = [];

  for (const { variant, path: urlPath } of urls) {
    const url = `${FRACTAL_URL}${urlPath}`;
    log(`Checking ${tagName} [${variant}] -> ${url}`);
    try {
      await page.goto(url, { waitUntil: 'networkidle' });
      await page.waitForFunction(
        (tag) => customElements.get(tag) !== undefined,
        tagName,
        { timeout: 5000 },
      );
      await page.waitForTimeout(200);

      const screenshotPath = path.join(outDir, `${variant}.png`);
      const el = page.locator(tagName).first();
      await el.screenshot({ path: screenshotPath }).catch(() => page.screenshot({ path: screenshotPath }));

      const computedStyle = await page.evaluate(
        ({ tag, props }) => {
          const host = document.querySelector(tag);
          if (!host?.shadowRoot) return null;
          const target = host.shadowRoot.querySelector('button, a, input, [class]') ?? host.shadowRoot.firstElementChild;
          if (!target) return null;
          const cs = getComputedStyle(target);
          return Object.fromEntries(props.map((p) => [p, cs[p]]));
        },
        { tag: tagName, props: COMPUTED_STYLE_PROPS },
      );

      report.push({ variant, url, screenshot: path.relative(ROOT, screenshotPath), computedStyle });
    } catch (err) {
      report.push({ variant, url, error: String(err) });
    }
  }

  await page.close();
  return report;
}

async function main() {
  const names = process.argv.slice(2);
  if (names.length === 0) {
    console.error('Usage: node scripts/verify-component.mjs <component-name> [category/name ...]');
    process.exit(1);
  }

  const targets = names.map((n) => ({ arg: n, ...resolveComponentDir(n) }));

  rebuild();

  const alreadyRunning = await isServerUp();
  let spawnedServer = null;
  if (alreadyRunning) {
    log(`Fractal server already running on :${FRACTAL_PORT} — reusing it.`);
  } else {
    spawnedServer = startFractal();
    const up = await waitForServer();
    if (!up) {
      stopFractal(spawnedServer);
      throw new Error('Fractal server did not come up within 30s.');
    }
  }

  const browser = await chromium.launch();
  const fullReport = {};
  try {
    for (const { name, dir } of targets) {
      fullReport[name] = await verifyComponent(browser, name, dir);
    }
  } finally {
    await browser.close();
    stopFractal(spawnedServer);
  }

  console.log(JSON.stringify(fullReport, null, 2));

  const hadErrors = Object.values(fullReport).some((variants) => variants.some((v) => v.error));
  if (hadErrors) {
    log('One or more variants failed to render — see "error" fields above.');
    process.exit(1);
  }
  log('Done. Screenshots written under packages/core/.verify/<name>/ — open them and eyeball against the reference.');
}

main().catch((err) => {
  console.error(`[verify-component] ${err.message ?? err}`);
  process.exit(1);
});
