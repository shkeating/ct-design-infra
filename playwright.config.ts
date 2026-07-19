import { defineConfig, devices } from '@playwright/test';

// Lets parallel component-porting agents (each in its own git worktree) run their
// own Fractal instance without colliding on the default port.
const FRACTAL_PORT = Number(process.env.CT_FRACTAL_PORT) || 3000;

export default defineConfig({
  testDir: './packages/core/src/components',
  testMatch: '**/*.e2e.ts',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    actionTimeout: 0,
    trace: 'on-first-retry',
    baseURL: `http://localhost:${FRACTAL_PORT}`,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'pnpm --filter @ct-infra/core run fractal:start',
    port: FRACTAL_PORT,
    reuseExistingServer: !process.env.CI,
  },
});
