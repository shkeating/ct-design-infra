const path = require("path");
const fs = require("fs");
const os = require("os");
const crypto = require("crypto");
const { spawnSync } = require("child_process");

// @frctl/core's component-discovery filter (fs.js) treats any path with a
// dot-prefixed segment as hidden — it substring-matches the FULL absolute
// path against /(^|\/)\.[^/.]/ instead of checking individual segments, so
// component collection silently returns zero results whenever this directory
// sits under a dot-prefixed ancestor. Agent worktrees live under
// `.claude/worktrees/<id>/` (see docs/parallel-porting.md), which trips this
// on every single-component-agent Fractal run. A symlink doesn't dodge it —
// Node resolves __dirname back to the real path through a symlinked entry —
// so mirror the files Fractal actually scans to a real, dot-free tmp
// directory and re-run from there.
function hasHiddenSegment(p) {
  return p.split(path.sep).some((segment) => segment.length > 1 && segment.startsWith("."));
}

if (hasHiddenSegment(__dirname) && !process.env.CT_FRACTAL_MIRRORED) {
  const coreDir = __dirname;
  const repoRoot = path.resolve(coreDir, "..", "..");
  const hash = crypto.createHash("sha1").update(coreDir).digest("hex").slice(0, 10);
  const mirrorCore = path.join(os.tmpdir(), `ct-fractal-mirror-${hash}`, "packages/core");
  const mirrorTokensDist = path.join(os.tmpdir(), `ct-fractal-mirror-${hash}`, "packages/tokens/dist");

  console.log(
    `[lab.cjs] ${coreDir} has a dot-prefixed path segment, which breaks Fractal's component discovery. Mirroring to ${mirrorCore} and re-running from there.`,
  );

  fs.rmSync(mirrorCore, { recursive: true, force: true });
  fs.cpSync(coreDir, mirrorCore, {
    recursive: true,
    dereference: true,
    filter: (src) => path.basename(src) !== "node_modules",
  });
  fs.symlinkSync(path.join(coreDir, "node_modules"), path.join(mirrorCore, "node_modules"), "dir");

  fs.rmSync(mirrorTokensDist, { recursive: true, force: true });
  fs.mkdirSync(mirrorTokensDist, { recursive: true });
  fs.cpSync(path.join(repoRoot, "packages/tokens/dist"), mirrorTokensDist, {
    recursive: true,
    dereference: true,
  });

  const result = spawnSync("node", ["lab.cjs"], {
    cwd: mirrorCore,
    stdio: "inherit",
    env: { ...process.env, CT_FRACTAL_MIRRORED: "1" },
  });
  process.exit(result.status ?? 1);
}

const fractal = require("./fractal.config.cjs");
const logger = fractal.cli.console;

// Lets parallel component-porting agents (each in its own git worktree) run their
// own Fractal instance without colliding on the default port.
const port = Number(process.env.CT_FRACTAL_PORT) || 3000;
fractal.web.set("server.port", port);

const server = fractal.web.server({
  sync: true,
});

server.on("error", (err) => logger.error(err.message));

server.start().then(() => {
  logger.success(`Fractal server is now running at ${server.url}`);
});
