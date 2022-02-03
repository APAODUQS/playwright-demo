## Execute Browserstack

### Run tests with Browserstack
1. Set your Browsesrstack credentials as environment variables, then execute in the command line:
``` 
export BROWSERSTACK_USERNAME="user_Abc123"
export BROWSERSTACK_ACCESS_KEY="qQ6qyMtixyoLxJrps2xF" 
```
2. Add the Browserstack's devices and machines where the tests will be executed to the config.ts file in projects by their projectname:
``` 
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
```npm run test ```

### Associate new tests with Browserstack
You have to associate your tests with the Browserstack's fixtures adding:  const { test } = require('../browserstack/fixtures'). This is an small test example:
```
const { test } = require('../browserstack/fixtures');
import { expect } from '@playwright/test';
 
// Use the test keyword to indicate you are creating a test and a proper description
test('basic test', async ({ page }) => {
  // Start: Navigation to a specific URL
  await page.goto('https://playwright.dev/');
  // Arrange: Find locators
  const title = page.locator('.navbar__inner .navbar__title');
  // Assert: Test validation
  await expect(title).toHaveText('Playwright');
});
```