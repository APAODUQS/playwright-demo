import base from '@playwright/test'
import config from '../playwright.config'
import { getCapability } from './browserstack.capabilities'

export const test = base.extend({
  browser: async ({ playwright, browser }, use, workerInfo) => {
    if (workerInfo.project.name.match(/browserstack/)) {
      const caps = getCapability(workerInfo.project.name)
      console.log(caps)
      const vBrowser = await playwright.chromium.connect({
        wsEndpoint: `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(JSON.stringify(caps))}`,
      })
      await use(vBrowser)
    } else {
      await use(browser)
    }
  },
  page: async ({ page, browser }, use, testInfo) => {
    if (testInfo.project.name.match(/browserstack/)) {
      const vContext = await browser.newContext(config.use)
      const vPage = await vContext.newPage()
      await use(vPage)
      const testResult = {
        action: 'setSessionStatus',
        arguments: {
          status: testInfo.status,
          reason: JSON.stringify(testInfo?.error),
        },
      }
      await vPage.evaluate(() => {
        console.log(JSON.stringify(testResult))
      }, `browserstack_executor: ${JSON.stringify(testResult)}`)
      await vContext.close()
    } else {
      use(page)
    }
  },
})
