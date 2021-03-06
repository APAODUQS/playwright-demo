import { devices, PlaywrightTestConfig } from '@playwright/test'

/**
 * See https://playwright.dev/docs/test-configuration.
 */

const RPconfig = {
  token: 'bc88f7ba-0045-4a4b-a387-250e96febb65',
  endpoint: 'http://localhost:8080/api/v1',
  project: 'superadmin_personal',
  launch: 'Example',
  attributes: [
    {
      key: 'key',
      value: 'value',
    },
    {
      value: 'value',
    },
  ],
  description: 'Your launch description',
}

const config: PlaywrightTestConfig = {
  testDir: './tests',

  /* Maximum time one test can run for. */
  timeout: 30 * 1000,

  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 60 * 1000,
  },

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,

  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html', { open: 'never' }],
    // ['@reportportal/agent-js-playwright', RPconfig],
  ],

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    // Browser options
    headless: true,
    viewport: { width: 1800, height: 900 },
    ignoreHTTPSErrors: true,

    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,

    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'https://playwright.dev/',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'Chrome',
      use: {
        browserName: 'chromium',
        channel: 'chrome',
      },
    },

    {
      name: 'Safari',
      use: {
        browserName: 'webkit',
      },
    },

    {
      name: 'Firefox',
      use: {
        browserName: 'firefox',
      },
    },
    {
      name: 'Microsoft-Edge',
      use: {
        // Supported Microsoft Edge channels are: msedge, msedge-beta, msedge-dev, msedge-canary
        channel: 'msedge',
      },
    },
    {
      name: 'firefox-dev',
      use: {
        ...devices['Desktop Firefox'],
      },
    },
    {
      name: 'firefox headful',
      use: {
        headless: false,
        ...devices['Desktop Firefox'],
      },
    },
    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: {
    //     ...devices['Pixel 5'],
    //   },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: {
    //     ...devices['iPhone 12'],
    //   },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: {
    //     channel: 'msedge',
    //   },
    // },

    // -- BrowserStack Projects --
    // name should be of the format browser@browser_version:os os_version@browserstack
    {
      name: 'chrome@desktop@browserstack',
    },
    {
      name: 'edge@desktop@browserstack',
    },
    {
      name: 'firefox@desktop@browserstack',
    },
    {
      name: 'safari@desktop@browserstack',
    },
  ],
}
export default config
