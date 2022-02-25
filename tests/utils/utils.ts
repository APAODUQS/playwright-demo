import { BrowserContext, Locator } from '@playwright/test'

export class UtilsTests {
  static getTheTitleParams(testTitle: string): RegExpMatchArray {
    const params = testTitle.match(/"([\s\S]*?)"/g)
    params.forEach(function (part, index) {
      params[index] = part.replace(/"/g, '')
    })

    return params
  }

  static async getTheNumberValue(component: Locator): Promise<number> {
    return Number((await component.innerText()).match(/[\d]*[.][\d]*/g))
  }

  static async manageNewPage(context: BrowserContext, actionOpenNewPage: void): Promise<string> {
    const [newPage] = await Promise.all([context.waitForEvent('page'), actionOpenNewPage])
    await newPage.waitForLoadState()

    return await newPage.title()
  }
}
