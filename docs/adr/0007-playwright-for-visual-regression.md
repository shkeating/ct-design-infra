## ADR 0007: Use Playwright for Visual Regression / E2E

Date: 2026-07-19

### Context

Because `static styles` is each component's entire visual spec and Shadow DOM prevents any external stylesheet from reaching it (see ADR 0006), unit tests that only check markup/a11y structure cannot catch a component that type-checks and renders correct DOM but is visually wrong or unstyled — exactly what happened with the Button component. The project needs an automated way to catch that class of regression, not just rely on someone remembering to look at Fractal manually.

We considered Chromatic (purpose-built for visual regression, but tied to Storybook/requires a paid hosted service, at odds with the "no Storybook" reasoning already established in ADR 0002), Percy (similar hosted-service tradeoffs), and BackstopJS (self-hosted and screenshot-focused, but a separate tool/config surface from whatever handled functional E2E, and less actively maintained than Playwright).

### Decision

Use `@playwright/test` for visual regression and E2E, configured at the workspace root (`playwright.config.ts`, `testDir: packages/core/src/components`, `testMatch: '**/*.e2e.ts'`), with specs living next to each component and running against the built Fractal preview server.

### Rationale

- Playwright is self-hosted and free, with no dependency on a third-party visual-diffing service — keeping the whole test/verification pipeline runnable locally and in CI without external accounts.
- Its built-in `toHaveScreenshot()` snapshot assertions cover the exact gap unit tests leave open: catching a component that is structurally correct but visually broken.
- Playwright can also read `getComputedStyle` on rendered shadow DOM directly, which lets tests assert on specific token values (e.g. "border-radius resolves to the expected `--ct-button-border-radius`") without needing a full screenshot diff for every check.
- `@web/test-runner-playwright` already uses Playwright-launched Chromium for the unit/a11y tier, so standardizing on Playwright for the visual tier avoids introducing a second browser-automation stack.
- Playwright's `webServer` option can auto-boot `fractal:start` on port 3000 if one isn't already running, so visual tests don't require a manually-managed dev server in CI.

### Consequences

- Every component needs an `.e2e.ts` spec navigating to its Fractal preview URL(s) per variant, alongside its `.test.ts` — visual coverage is opt-in per component, not automatic.
- Baseline screenshots must be committed and deliberately re-generated (`pnpm exec playwright test --update-snapshots`) whenever an intentional visual change is made; forgetting this step turns every legitimate style change into a failing test, and skipping review of the diff turns it into a rubber stamp.
- Screenshot snapshots are inherently platform/renderer-sensitive (font rendering, OS-level anti-aliasing); CI and local runs need to use the same Playwright browser build or baselines will flake across environments.
