import { defineConfig, devices } from "@playwright/test";

const basePath = process.env.POC_BASE_PATH ?? "/site-VTTKD/";

export default defineConfig({
  testDir: "./tests/poc",
  fullyParallel: false,
  forbidOnly: true,
  retries: 0,
  workers: 1,
  timeout: 45_000,
  expect: {
    timeout: 10_000,
  },
  outputDir: "test-results/poc",
  reporter: [
    ["list"],
    [
      "json",
      { outputFile: "docs/POC/evidence/playwright-results.json" },
    ],
  ],
  use: {
    baseURL: "http://127.0.0.1:4322",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    reducedMotion: "reduce",
  },
  projects: [
    {
      name: "poc-chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command:
      "node scripts/preview-poc.mjs --host 127.0.0.1 --port 4322",
    url: `http://127.0.0.1:4322${basePath}fr/`,
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
