import { defineConfig, devices } from '@playwright/test';

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
    baseURL: 'http://localhost:3000', // Default Fractal dev server port
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'pnpm --filter @ct-infra/core run fractal:start',
    port: 3000,
    reuseExistingServer: !process.env.CI,
  },
});
