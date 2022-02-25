import base from '@playwright/test'
import { getCapability } from './browserstack.capabilities'

export const test = base.extend({
  page: async ({ page, playwright }, use, testInfo) => {
    if (testInfo.project.name.match(/browserstack/)) {
      const caps = getCapability(testInfo.project.name)
      const vBrowser = await playwright.chromium.connect({
        wsEndpoint: `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(JSON.stringify(caps))}`,
      })
      const vPage = await vBrowser.newPage(testInfo.project.use)
      await use(vPage)
      const testResult = {
        action: 'setSessionStatus',
        arguments: {
          name: `Testing with playwright ${caps.name}: ${testInfo.title}`,
          status: testInfo.status,
          reason: `${testInfo?.title}: ${JSON.stringify(testInfo?.error)}`,
        },
      }
      await vPage.evaluate(() => {
        console.log(JSON.stringify(testResult))
      }, `browserstack_executor: ${JSON.stringify(testResult)}`)
      await vPage.close()
      await vBrowser.close()
    } else {
      use(page)
    }
  },
})
