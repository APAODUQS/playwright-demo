const base = require('@playwright/test');
const cp = require('child_process');
const clientPlaywrightVersion = cp.execSync('npx playwright --version').toString().trim().split(' ')[1];
const config = require('../playwright.config.ts');
var BSCaps = require('./browserstackCapabilities');

exports.test = base.test.extend({
    browser: async ({ playwright, browser }, use, workerInfo) => {
        if (workerInfo.project.name.match(/browserstack/)) {
            var caps = BSCaps.getCapability(workerInfo.project.name);
            caps.playwrightVersion = clientPlaywrightVersion;
            console.log(caps);
            var vBrowser = await playwright.chromium.connect({
                wsEndpoint: `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(JSON.stringify(caps))}`,
            });
            await use(vBrowser);
        } else {
            await use(browser);
        }
    },
    page: async ({ page, browser }, use, testInfo) => {
        if (testInfo.project.name.match(/browserstack/)) {
            const vContext = await browser.newContext(config.default.use);
            const vPage = await vContext.newPage();
            await use(vPage);
            const testResult = {
                action: 'setSessionStatus',
                arguments: {
                    status: testInfo.status,
                    reason: JSON.stringify(testInfo?.error),
                },
            };
            await vPage.evaluate(() => { },
                `browserstack_executor: ${JSON.stringify(testResult)}`);
            await vContext.close();
        } else {
            use(page);
        }
    },
});