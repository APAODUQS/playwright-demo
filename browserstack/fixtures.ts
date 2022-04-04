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
    testInfo.annotations.push({ type: 'Execution date', description: new Date().toString() })
    testInfo.attach('Browserstack session public url: ', {
      contentType: 'text/html',
      body: '<a href="www.google.com">Link</a>',
    })
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
      process.env['BROWSERSTACK_REPORT'] = urlBrowserReport
      testInfo.annotations.push({ type: 'Browserstack build', description: urlBrowserReport })
      testInfo.annotations.push({ type: 'Browserstack session public url', description: sessionDetails.public_url })
      await browserstackPage.close()
      await context.close()
    } else {
      use(page)
    }
  },
})
