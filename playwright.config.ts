import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: "http://127.0.0.1:1313",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure"
  },
  webServer: [
    {
      command: "hugo server -D --renderToMemory --bind 127.0.0.1 --port 1313 --baseURL http://127.0.0.1:1313 --disableFastRender",
      url: "http://127.0.0.1:1313",
      reuseExistingServer: !process.env.CI,
      timeout: 120000
    },
    {
      command:
        "hugo server -D --renderToMemory --clock 2038-01-01T00:00:00-06:00 --bind 127.0.0.1 --port 1314 --baseURL http://127.0.0.1:1314 --disableFastRender",
      url: "http://127.0.0.1:1314",
      reuseExistingServer: !process.env.CI,
      timeout: 120000
    }
  ],
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] }
    }
  ]
});
