import { Locator, Page } from '@playwright/test'
import { HomePage } from '../page-object/home.page'

export class TopBarComponent extends HomePage {
  readonly TOP_BAR: string = '(//*[@class="navbar__link"])'

  readonly component: Page
  readonly versionSelection: Locator
  readonly languageSelection: Locator

  constructor(component: Page) {
    super(component)
    this.component = component
    this.versionSelection = component.locator(this.TOP_BAR).nth(0)
    this.languageSelection = component.locator(this.TOP_BAR).nth(1)
  }

  async gotoTopBarVersions() {
    await this.versionSelection.click()
  }

  async gotoTopBarLanguages() {
    await this.languageSelection.click()
  }
}
