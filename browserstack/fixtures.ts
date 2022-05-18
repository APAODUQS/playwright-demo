import base from '@playwright/test'
import { getCapability } from '../browserstack/browserstack.capabilities'

export const test = base.extend({
  page: async ({ playwright, page }, use, testInfo) => {
    testInfo.annotations.push({ type: 'Execution date', description: new Date().toString() })
    if (testInfo.project.name.match(/browserstack/)) {
      // Get the Browserstack capabilities: browser configuration
      const capabilities = getCapability(testInfo.project.name)
      // Call the Browserstack API
      const browserstackBrowser = await playwright.chromium.connect({
        wsEndpoint: `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(JSON.stringify(capabilities))}`,
      })
      // Launch a page for the execution of the tests on each Browserstack browser
      const browserstackPage = await (await browserstackBrowser.newContext(testInfo.project.use)).newPage()
      await use(browserstackPage)
      // Set the info to show in the test results on Browserstack
      const testResult = {
        action: 'setSessionStatus',
        arguments: {
          name: `${testInfo.titlePath}: ${capabilities.name}`,
          status: testInfo.status,
          reason:
            testInfo?.error != undefined
              ? `Line: ${testInfo?.line} - Error: ${JSON.stringify(testInfo?.error?.message)}`
              : '',
        },
      }
      await browserstackPage.evaluate(() => Object(), `browserstack_executor: ${JSON.stringify(testResult)}`)
      const sessionDetails = JSON.parse(
        await browserstackPage.evaluate(
          () => String(),
          `browserstack_executor: ${JSON.stringify({ action: 'getSessionDetails' })}`,
        ),
      )
      let urlBrowserReport = JSON.stringify(sessionDetails.browser_url)
      urlBrowserReport = urlBrowserReport.substring(1, urlBrowserReport.indexOf('session'))
      testInfo.annotations.push({ type: 'Browserstack build', description: urlBrowserReport })
      testInfo.annotations.push({ type: 'Browserstack session public url', description: sessionDetails.public_url })
      await browserstackPage.context().browser()?.close()
      await browserstackPage.close()
    } else {
      use(page)
    }
  },
})

export { expect } from '@playwright/test'
