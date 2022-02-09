import { expect, Locator, Page } from '@playwright/test'
import { LocatorConstants } from '../utils/locator.constants'

export class DocBarComponent {
  readonly docPage: Page
  readonly docBar: Locator

  constructor(docPage: Page) {
    this.docPage = docPage
    this.docBar = docPage.locator(LocatorConstants.DOC_BAR)
  }

  async goto() {
    await this.docPage.goto('/docs/intro')
    await expect(this.docBar).toBeVisible()
  }

  async gotoDocOption(option: string) {
    let locator = LocatorConstants.OPTION
    locator = locator.replace(/OPTION/, option)
    const selectOption = this.docPage.locator(locator)
    selectOption.click()
  }
}
