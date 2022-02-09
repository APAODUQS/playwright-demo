import { expect, Locator, Page } from '@playwright/test'
import { LocatorConstants } from '../utils/locator.constants'

export class DocPage {
  readonly docPage: Page
  readonly docTitle: Locator

  constructor(docPage: Page) {
    this.docPage = docPage
    this.docTitle = docPage.locator(LocatorConstants.PAGE_TITLE)
  }

  async goto() {
    await this.docPage.goto('/docs/intro')
    await expect(this.docTitle).toBeVisible()
  }
}
