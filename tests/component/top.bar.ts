import { Locator, Page } from '@playwright/test'
import { HomePage } from '../page-object/home.page'

export class TopBarComponent extends HomePage {
  readonly TOP_BAR_VERSIONS: string = '(//*[@class="navbar__link"])[1]'
  readonly TOP_BAR_LANGUAGES: string = '(//*[@class="navbar__link"])[2]'

  readonly component: Page
  readonly versionSelection: Locator
  readonly languageSelection: Locator

  constructor(component: Page) {
    super(component)
    this.component = component
    this.versionSelection = component.locator(this.TOP_BAR_VERSIONS)
    this.languageSelection = component.locator(this.TOP_BAR_LANGUAGES)
  }

  async gotoTopBarVersions() {
    this.versionSelection.click()
  }

  async gotoTopBarLanguages() {
    this.languageSelection.click()
  }
}
