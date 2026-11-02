import { defineConfig } from '@playwright/test';

// Load TEST_PASSWORD from a local .env file, if there is one (Node 20.12+).
// In CI there is no .env: the workflow passes the secret in as an environment variable.
try { process.loadEnvFile(); } catch {}

export default defineConfig({
  testDir: './tests',
  timeout: 5_000,
  fullyParallel: true,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: { headless: true },
});
