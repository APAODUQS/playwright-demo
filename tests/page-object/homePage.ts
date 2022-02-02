import { expect, Locator, Page } from '@playwright/test';
import { LocatorConstants } from '../utils/locatorConstants';

export class HomePage {
    readonly homePage: Page;
    readonly getStartButton: Locator;

    constructor(homePage: Page){
        this.homePage = homePage;
        this.getStartButton = homePage.locator(LocatorConstants.GET_STARTED_BUTTON);
    }

    async goto(){
        await this.homePage.goto('/');
    }

    async clickStartButton(){
        await expect(this.getStartButton).toBeVisible();
        this.getStartButton.click();
    }

}