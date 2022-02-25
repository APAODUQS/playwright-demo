import { expect, Locator, Page } from '@playwright/test'
import { HomePage } from './home.page'

export class DocPage extends HomePage {
  readonly PAGE_TITLE: string = 'h1'

  readonly docPage: Page
  readonly docTitle: Locator

  constructor(docPage: Page) {
    super(docPage)
    this.docPage = docPage
    this.docTitle = docPage.locator(this.PAGE_TITLE)
  }

  async gotoDocumentation() {
    await this.docPage.goto('/docs/intro')
    await expect.soft(this.docTitle, 'The documentation page should be loaded').toBeVisible()
  }
}
