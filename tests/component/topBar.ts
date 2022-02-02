import { expect, Locator, Page } from '@playwright/test';
import { LocatorConstants } from '../utils/locatorConstants';

export class TopBarComponent {
    readonly homePage: Page;
    readonly versionSelection: Locator;
    readonly languageSelection: Locator;

    constructor(homePage: Page){
        this.homePage = homePage;
        this.versionSelection = homePage.locator(LocatorConstants.TOP_BAR_VERSIONS);
        this.languageSelection = homePage.locator(LocatorConstants.TOP_BAR_LANGUAGES);
    }

    async goto(){
        await this.homePage.goto('/');
    }

    async gotoTopBarVersions(){
        this.versionSelection.click();
    }

    async gotoTopBarLanguages(){
        this.languageSelection.click();
    }

}