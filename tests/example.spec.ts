const { test } = require('../browserstack/fixtures');
import { expect } from '@playwright/test';
import { HomePage } from './page-object/homePage';
import { DocPage } from './page-object/docPage';
import { TopBarComponent } from './component/topBar';
import { DocBarComponent } from './component/docBar';

test('Get started with Playwright', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await page.locator('text=Get started').click();
  await expect(page).toHaveTitle(/Getting started/);
});

test('Select the Top Bar Options', async ({ page }) => {
  const runner = new TopBarComponent(page);
  await runner.goto();
  await runner.gotoTopBarLanguages();
  await runner.gotoTopBarVersions();
});

test('Go to Get started with Playwright', async ({ page }) => {
  const runner1 = new HomePage(page);
  await runner1.goto();
  await runner1.clickStartButton();
  const runner2 = new DocPage(page);
  await expect(runner2.docTitle.first()).toHaveText(/Getting started/);
});

test('Select Document Bar Options', async ({ page }) => {
  const runner = new DocBarComponent(page);
  await runner.goto();
  await runner.gotoDocOption('Reporters');
  const runner2 = new DocPage(page);
  await expect(runner2.docTitle.first()).toHaveText(/Reporters/);
});
