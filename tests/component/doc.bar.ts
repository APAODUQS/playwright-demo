import { expect, Locator, Page } from '@playwright/test'
import { DocPage } from '../page-object/doc.page'

export class DocBarComponent extends DocPage {
  readonly DOC_BAR: string = '#__docusaurus > div.main-wrapper > div > aside > div > nav > ul'
  readonly OPTION: string = 'text=OPTION'

  readonly component: Page
  readonly docBar: Locator

  constructor(component: Page) {
    super(component)
    this.component = component
    this.docBar = component.locator(this.DOC_BAR)
  }

  async gotoDocOption(option: string) {
    await expect.soft(this.docBar, 'The bar documentation should be visible').toBeVisible()
    let locator = this.OPTION
    locator = locator.replace(/OPTION/, option)
    const selectOption = this.component.locator(locator)
    await selectOption.click()
  }
}
