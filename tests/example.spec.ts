import { test } from '../browserstack/fixtures'
import { expect } from '@playwright/test'
import { UtilsTests } from './utils/utils'
import { DocPage } from './page-object/doc.page'
import { TopBarComponent } from './component/top.bar'
import { DocBarComponent } from './component/doc.bar'

test.describe('My tests set', () => {
  test.beforeEach(async ({ browserName }) => {
    test.slow(browserName == 'firefox', 'Page does not work in mobile yet')
  })

  test('Get started with Playwright @playwright', async ({ page }) => {
    await page.goto('https://playwright.dev/')
    await page.locator('text=Get started').click()
    await expect(page).toHaveTitle(/Getting started/)
  })

  test('Select the Top Bar Options', async ({ page }) => {
    const runner = new TopBarComponent(page)
    await runner.goto()
    await runner.gotoTopBarLanguages()
    await runner.gotoTopBarVersions()
  })

  test('Go to "Getting started" with Playwright', async ({ page }, testInfo) => {
    const section = UtilsTests.getTheTitleParams(testInfo.title)[0]
    const runner = new DocPage(page)
    await runner.goto()
    await runner.clickStartButton()
    await expect.soft(runner.docTitle, `The title page should be: ${section}`).toHaveText(new RegExp(section, 'i'))
    expect.soft(await runner.docPage.title(), `The title page should contain: ${section}`).toContain(section)
  })

  test('Select Document Bar Options and go to the "Reporters" option', async ({ page }, testInfo) => {
    const subsection = UtilsTests.getTheTitleParams(testInfo.title)[0]
    const runner = new DocBarComponent(page)
    await runner.gotoDocumentation()
    await runner.gotoDocOption(subsection)
    await expect(runner.docTitle.first()).toHaveText(new RegExp(subsection, 'i'))
  })

  // test('HALO TEST', async ({ page }) => {
  //   const runner = new HaloDefaultPage(page)
  //   await runner.goto()
  //   await runner.clickHotspotButton()
  //   await expect(runner.hotspotTitle.first()).toHaveText(/TOUCHPODS/)
  // })
})
