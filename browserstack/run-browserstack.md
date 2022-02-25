## Execute Browserstack

### Run tests with Browserstack

1. Set your Browsesrstack credentials as environment variables, then execute in the command line:

```
export BROWSERSTACK_USERNAME="user_Abc123"
export BROWSERSTACK_ACCESS_KEY="qQ6qyMtixyoLxJrps2xF"
```

2. Add the Browserstack's devices and machines where the tests will be executed to the config.ts file in projects by their projectname:

```typescript:
projects:[
    // name should be of the format browser@browser_version:os os_version@browserstack
    {
      name: 'chrome@desktop@browserstack',
    },
    {
      name: 'edge@desktop@browserstack',
    }
]
```

3. Run all Donda tests locally
   `npm run test `

### Associate new tests with Browserstack

You have to associate your tests with the Browserstack's fixtures adding: `import { test } from '../browserstack/fixtures'`. This is an small test example:

```typescript:
import { test } from '../browserstack/fixtures'
import { expect } from '@playwright/test';

// Use the test keyword to indicate you are creating a test and a proper description
test('basic test', async ({ page }) => {
  // Start: Navigation to a specific URL
  await page.goto('https://playwright.dev/');
  // Arrange: Find locators
  const title = page.locator('.navbar__inner .navbar__title');
  // Assert: Test validation
  await expect.soft(title, 'Some message error').toHaveText('Playwright');
});
```

### Get reports from Browserstack

For reviewing the browserstack reports:

1. Go to: `https://automate.browserstack.com/dashboard/v2` and login.
2. There you can figure out the build execution, in this case: `playwright-testing-build`
3. In the build execution you can see all sessions where the test were executing, the sessions that we set in the `browser.capabilities.ts` file. These sessions should have the information about the browser, operative system and the version of the operative system: `Testing with playwright BROWSER on desktop OS OS_VS`
4. In any session, you should see the description, capabilities, execution's status, execution's time, logs with the step by step and a video with the execution of the tests, where you can see all details about it and verify if the tests run OK or if they didn't run OK to check the errors.
