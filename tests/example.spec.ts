import { test } from '../browserstack/fixtures'
import { expect } from '@playwright/test'
import { UtilsTests } from './utils/utils'
import { DocPage } from './page-object/doc.page'
import { TopBarComponent } from './component/top.bar'
import { DocBarComponent } from './component/doc.bar'

test.describe('My tests set', () => {
  test('Get started with Playwright @playwright', async ({ page }) => {
    await page.goto('https://playwright.dev/')
    await page.locator('text=Get started').click()
    await expect(page).toHaveTitle(/Getting started/)
    // const screenshot = await page.screenshot()
    // await testInfo.attach('screenshot', { body: screenshot, contentType: 'image/png' })
    // ReportingApi.addAttributes([
    //   {
    //     key: 'testKey',
    //     value: 'testValue',
    //   },
    //   {
    //     value: 'testValueTwo',
    //   },
    // ])
    // ReportingApi.setTestCaseId('itemTestCaseId')
    // ReportingApi.info('info log with attachment')
    // expect(true).toBe(true)
    // ReportingApi.setStatusFailed()
  })

  test('Select the Top Bar Options', async ({ page }) => {
    const runner = new TopBarComponent(page)
    await runner.goto()
    await runner.gotoTopBarLanguages()
    await runner.gotoTopBarVersions()
  })

  test('Go to "Installation" with Playwright  @test', async ({ page }, testInfo) => {
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

  test('Get started with Playwright 1 @playwright', async ({ page }) => {
    await page.goto('https://playwright.dev/')
    const text = 'Playwright enables reliable end-to-end testing for modern web apps'
    const locator = page.locator(`text=${text}`)
    await expect.soft(locator.first(), `The text ${text} should be present`).toContainText(text)
  })
  test('Get started with Playwright 2 @playwright', async ({ page }) => {
    await page.goto('https://playwright.dev/')
    const text = 'start'
    const locator = page.locator(`text=${text}`)
    await expect.soft(locator.first(), `The text ${text} should be present`).toContainText(text)
  })
  test('Get started with Playwright 3 @playwright', async ({ page }) => {
    await page.goto('https://playwright.dev/')
    const text = 'Any browser'
    const locator = page.locator(`text=${text}`)
    await expect.soft(locator.first(), `The text ${text} should be present`).toContainText(text)
  })
  test('Get started with Playwright 4 @playwright', async ({ page }) => {
    await page.goto('https://playwright.dev/')
    const text = 'Resilient'
    const locator = page.locator(`text=${text}`)
    await expect.soft(locator.first(), `The text ${text} should be present`).toContainText(text)
  })
  test('Get started with Playwright 5 @playwright', async ({ page }) => {
    await page.goto('https://playwright.dev/')
    const text = 'Any platform'
    const locator = page.locator(`text=${text}`)
    await expect.soft(locator.first(), `The text ${text} should be present`).toContainText(text)
  })
  test('Get started with Playwright 6 @playwright', async ({ page }) => {
    await page.goto('https://playwright.dev/')
    const text = 'No flaky tests'
    const locator = page.locator(`text=${text}`)
    await expect.soft(locator.first(), `The text ${text} should be present`).toContainText(text)
  })
  test('Get started with Playwright 7 @playwright', async ({ page }) => {
    await page.goto('https://playwright.dev/')
    const text = 'One API'
    const locator = page.locator(`text=${text}`)
    await expect.soft(locator.first(), `The text ${text} should be present`).toContainText(text)
  })
  test('Get started with Playwright 8 @playwright', async ({ page }) => {
    await page.goto('https://playwright.dev/')
    const text = 'Chosen by companies and open source projects'
    const locator = page.locator(`text=${text}`)
    await expect.soft(locator.first(), `The text ${text} should be present`).toContainText(text)
  })
  test('Get started with Playwright 9 @playwright', async ({ page }) => {
    await page.goto('https://playwright.dev/')
    const text = 'Powerful Tooling'
    const locator = page.locator(`text=${text}`)
    await expect.soft(locator.first(), `The text ${text} should be present`).toContainText(text)
  })
  test('Get started with Playwright 10 @playwright', async ({ page }) => {
    await page.goto('https://playwright.dev/')
    const text = 'Community'
    const locator = page.locator(`text=${text}`)
    await expect.soft(locator.first(), `The text ${text} should be present`).toContainText(text)
  })
})
