import { expect, test } from '@playwright/test'
import { common } from './common'

test.describe('My tests', () => {
  test('Get started', async ({ page }) => {
    common.Login(page, 'https://playwright.dev/')
    await expect(page).toHaveTitle(/Installation/)
  })
})
