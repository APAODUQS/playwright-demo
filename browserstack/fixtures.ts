import base from '@playwright/test'
import { getCapability } from './browserstack.capabilities'

export const test = base.extend({
  context: async ({ playwright, context }, use, testInfo) => {
    if (testInfo.project.name.match(/browserstack/)) {
      // Get the Browserstack capabilities: browser configuration
      const capabilities = getCapability(testInfo.project.name)
      // Call the Browserstack API
      const browserstackBrowser = await playwright.chromium.connect({
        wsEndpoint: `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(JSON.stringify(capabilities))}`,
      })
      // Set the new context for the Browserstack browsers
      const browserstackContext = await browserstackBrowser.newContext(testInfo.project.use)
      await use(browserstackContext)
    } else {
      use(context)
    }
  },
  page: async ({ page, context }, use, testInfo) => {
    if (testInfo.project.name.match(/browserstack/)) {
      // Get the Browserstack capabilities: browser configuration
      const capabilities = getCapability(testInfo.project.name)
      // Launch a page for the execution of the tests on each Browserstack browser
      const browserstackPage = await context.newPage()
      await use(browserstackPage)
      // Set the info to show in the test results on Browserstack
      const testResult = {
        action: 'setSessionStatus',
        arguments: {
          name: `${capabilities.name}: ${testInfo.title}`,
          status: testInfo.status,
          reason:
            testInfo?.error != undefined
              ? `Line: ${testInfo?.line} - Error: ${JSON.stringify(testInfo?.error?.message)}`
              : 'Run Successfully',
        },
      }
      await browserstackPage.evaluate(() => {
        console.log(JSON.stringify(testResult))
      }, `browserstack_executor: ${JSON.stringify(testResult)}`)
      await browserstackPage.close()
      await context.close()
    } else {
      use(page)
    }
  },
})
