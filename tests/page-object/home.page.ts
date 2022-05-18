import { expect, Locator, Page } from '@playwright/test'

export class HomePage {
  readonly GET_STARTED_BUTTON: string = 'text=Get started'

  readonly component: Page
  readonly getStartButton: Locator

  constructor(homePage: Page) {
    this.component = homePage
    this.getStartButton = homePage.locator(this.GET_STARTED_BUTTON)
  }

  async goto() {
    await this.component.goto('/')
  }

  async clickStartButton() {
    await expect.soft(this.getStartButton, 'The "Get Start" button should be visible').toBeVisible()
    await this.getStartButton.click()
  }
}
