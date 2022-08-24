import { Page, test } from '@playwright/test'

export const common = {
  Login: async function (page: Page, site: string) {
    await test.step(`Step 1 ${site}`, async () => {
      console.log('Executing Step 1')
      await page.goto(site)
    })

    await test.step(`Step 2 `, async () => {
      console.log('Executing Step 2')
      await page.locator('text=Get started').click()
    })
  },
}
