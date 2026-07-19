# Porting components in parallel

`.claude/skills/add-component/SKILL.md` documents how to port one CivicTheme component. This doc is the orchestration layer on top: how to run several ports concurrently using the `Agent` tool, without them colliding with each other or with your own working tree.

## The mechanism

- **`Agent` tool with `isolation: "worktree"`**: each call gets its own git worktree — a separate on-disk checkout on a fresh branch. N agents can each port a different component with zero file/branch collisions.
- **`run_in_background: true`** (the default): launch several `Agent` calls in one message; each runs concurrently and notifies you on completion.
- Two shared files still need care even with worktree isolation, because independent branches off the same base can still conflict when they land back on `main`: `packages/tokens/src/tokens.json` and `packages/core/package.json`/`pnpm-lock.yaml`. The conventions in `SKILL.md` (component-scoped token keys, checking before adding shared-tier tokens, reusing existing dependencies) exist specifically to keep these diffs non-overlapping. `packages/core/registry.json` and `packages/core/dist/`/`packages/tokens/dist/` are generated, gitignored build output — no conflict surface at all, never merge these, just regenerate.
- Worktrees land at `.claude/worktrees/<id>/` — a dot-prefixed ancestor directory that used to break `pnpm verify:component`/`fractal:start` entirely (`@frctl/core`'s hidden-file filter substring-matches the full path, so it discovered zero components for every agent running inside a worktree). `packages/core/lab.cjs` now detects this and transparently mirrors the Fractal-scanned files to a dot-free tmp directory before booting the server, so this is no longer something a porting agent needs to work around by hand — see `SKILL.md`'s "Known gotchas".

## 1. Pick a batch

Cross-reference `wcag-data/*.json` (one file per CivicTheme component — the master list of what exists upstream) against what's already implemented: `find packages/core/src/components -maxdepth 2 -type d`, or `packages/core/registry.json` after a build. Check `PORTING_STATUS.json` (below) so you don't claim something another batch already has in progress.

## 2. Launch

One message, N `Agent` calls, each with `isolation: "worktree"`, `run_in_background: true`, and a distinct `CT_FRACTAL_PORT` (e.g. `3010`, `3020`, ...) so their `verify:component` runs don't check each other's builds. Before launching, mark each claimed component `"in-progress"` in `PORTING_STATUS.json`.

Prompt template — fill in the bracketed parts per component:

```
You are porting the CivicTheme "<name>" component into this repo, non-interactively —
no one will answer clarifying questions, so make a documented best-effort choice
and flag it rather than stopping.

Setup (do this first):
1. Run `pnpm install` (this worktree has no node_modules yet).
2. export CT_FRACTAL_PORT=<assigned port>
3. Confirm you're on a fresh branch in an isolated worktree (not main).

Task: follow .claude/skills/add-component/SKILL.md end-to-end for:
  category: <ui|layout|...>
  name: <kebab-case-name>
  tier: <01-atoms|02-molecules|03-organisms, or "determine via GitHub contents API">

See SKILL.md's "Reconcile tokens", "Implement the Lit component", and "Parallel porting"
sections for the token-tiering, dependency-reuse, Zag-adapter-reuse, and non-interactive
fallback conventions this batch requires — don't skip them, they're what keeps this
component's diff from conflicting with the other agents running alongside you.

Deliverable:
- Commit all work to this worktree's branch (conventional commit messages).
- Do NOT push, open a PR, or merge.
- Leave the worktree in place.
- End with a structured summary: files changed, token keys added (split by tier),
  new dependencies added (if any), verify-component pass/fail per variant, and
  anything flagged per the fallback rules in SKILL.md.
```

## 3. Review

For each completed agent: read its structured final summary, inspect its worktree's `git diff` against the base branch, and open `packages/core/.verify/<name>/*.png` in that worktree (gitignored scratch output, not part of the diff — look at it directly, don't rely on the agent's own pass/fail claim for anything visual).

## 4. Merge

One branch at a time, not all N simultaneously — each subsequent branch's `tokens.json`/`pnpm-lock.yaml` insertion should land against the latest shared state, not a stale one. If a `pnpm-lock.yaml` conflict does show up, resolve it by re-running `pnpm install` on the merged `package.json` rather than hand-editing the lockfile. After merging, regenerate `packages/core/registry.json` (`pnpm build:core`) — it's derived, so this just picks up the newly-merged component automatically.

## 5. Clean up

Remove the merged worktree (`git worktree remove <path>`), and flip its `PORTING_STATUS.json` entry to `"done"`.

## Batch size

Start small — 2, not 10 — and treat the first run as validating the mechanism, not throughput. Graduation criteria before scaling up: each agent's `verify:component` actually checked its own build (screenshots genuinely differ and match their own component, confirming port isolation worked); `pnpm install`/`build:tokens` completed cleanly in every worktree; merging back produced zero or only trivial, obviously-resolvable conflicts in `tokens.json`/`pnpm-lock.yaml`; and the non-interactive fallback rules got exercised at least once rather than an agent stalling on a question it couldn't ask. Once those hold, review time — a human still has to look at every screenshot — is the real bottleneck, not agent throughput, so there's limited value in pushing batch size much past 4-6 even at scale.