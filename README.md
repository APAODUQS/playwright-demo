# playwright-demo

## Requeriments

You need to have Node.js installed. We are using the playwright library for executing tests, then you have to install the library and the supported browsers:

```bash
npm i -D @playwright/test
#install supported browsers
npx playwright install
```

## Create the project

```bash
#Run from your project's root directory
npm init playwright
```

## Run tests

The first time you need to install the dependencies:

```bash
npm install
```

Then you can execute the tests:

```bash
npm run test
# The previous command is configured in the package.json to execute:
npx playwright test --config=playwright.config.ts
```

Or you can run specific test files, specify the route of the tests:

```bash
npx playwright test tests/TEST_CLASS.spec.ts --config=playwright.config.ts
```

## View reports

The project is configured to create a HTML report, then after the tests are executed you can run:

```
npx playwright show-report
```

## Execute analysis for the code style

You have to set some rules about the code style in the file `.prettierrc`, or you can use the default rules. From those rules, you can verify your code style executing:
`npm run prettier:check`
In this way you can see any error or warning. For fixing those errors and warnings that can be fixed autocally, you can execute:
`npm run prettier:write`.

You can do an analysis with `eslint` executing:

```bash
npm run lint
// that runs:
eslint '**/*.{js,ts,tsx}' --quiet
```

And if you want to fix errors that can be fixed autocally, you can execute:
`eslint '**/*.{js,ts,tsx}' --quiet --fix`

And finally if you want preventing formatting errors from being committed or pushed, you can add `husky` to your project. More information: https://robertcooper.me/post/using-eslint-and-prettier-in-a-typescript-project

## Playwright Tools

Playwright has a [Debugging Tools](https://playwright.dev/docs/debug) which can help us to find the Selectors, run our test in a debug mode or review the details for a test execution.

### Playwright Inspector

[Playwright Inspector](https://playwright.dev/docs/debug#playwright-inspector) is a GUI tool that helps authoring and debugging Playwright scripts. With this tool you can:

- Execute your scripts in debug mode.
- Navigates step by step thought your scripts.
- Review the logs during the execution of any step.
- Record any actions that you do in the browser and later reproduce them.

For execute the inspector, set the PWDEBUG environment variable to run your scripts in debug mode:

```bash
# You can debug all your test
PWDEBUG=1 npm run test

# You can debug a specific test
WDEBUG=1 npx playwright test tests/YOUR_TEST_CLASS.spec.ts --config=config.ts
```

## Browser Developer Tools

You can use browser developer tools in your own browser. Developer tools help to:

- Inspect the DOM tree
- See console logs during execution (or learn how to [read logs via API](https://playwright.dev/docs/verification#console-logs))
- Check network activity and other developer tools features

- Debugging Selectors​:
  - You need to execute the Playwright Inspector
  - Click the Explore button to hover over elements in the screen and click them to automatically generate selectors for those elements. To verify where selector points, paste it into the inspector input field.
  - You can also use the API inside the Developer Tools Console of any browser.
    - Open the Browser Developer Tools (macOS-Chrome: fn+12).
    - Click the "Select an element in the page to inspect it" button to hover over elements in the screen and click them (macOS-Chrome: cmd+shift+c).
    - Go to the console panel and use the playwright API:
      - `playwright.$(selector)`: Highlight the first occurrence of the selector. This reflects how page.$ would see the page. (Ex: playwright.$('.auth-form >> text=Log in');)
      - `playwright.$$(selector)`: Highlight all occurrences of the selector. This reflects how page.$$ would see the page. (Ex: playwright.$$('li >> text=John'))
      - `playwright.inspect(selector)`: Inspect the selector in the Elements panel. (Ex: playwright.inspect('text=Log in'))
      - `playwright.locator(selector)`: Highlight the first occurrence of the locator. (Ex: playwright.locator('.auth-form', { hasText: 'Log in' });)
      - `playwright.selector(element)`: Generate a selector that points to the element. (Ex: playwright.selector($0))
      - `playwright.clear()`: Clear existing highlights.

### Test Generator: codegen

Playwright has a [Test Generator](https://playwright.dev/docs/codegen) that comes with the ability to generate tests out of the box

- Generate tests: Run `codegen` and perform actions in the browser. Playwright will generate the code for the user interactions. `codegen` will attempt to generate resilient text-based selectors:

```bash
npx playwright codegen 'YOUR_HOST/CREDENTIALS'
```

- Preserve authenticated state: Run `codegen` with:
  - `--save-storage` to save cookies and localStorage at the end of the session. This is useful to separately record authentication step and reuse it later in the tests.
  ```bash
  npx playwright codegen --save-storage=auth.json
  # Go to the url 'YOUR_HOST/CREDENTIALS' and exit.
  # auth.json will contain the storage state.
  ```
  - `--load-storage` to consume previously loaded storage. This way, all cookies and localStorage will be restored, bringing most web apps to the authenticated state.
  ```bash
  npx playwright open --load-storage=auth.json 'YOUR_HOST'
  npx playwright codegen --load-storage=auth.json 'YOUR_HOST'
  # Perform actions in authenticated state.
  ```
