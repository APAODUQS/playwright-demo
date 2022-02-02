# playwright-demo

## Requeriments
You need to have Node.js installed. We are using the playwright library for executing tests, then you have to install the library and the supported browsers:
´´´
npm i -D @playwright/test
# install supported browsers
npx playwright install
´´´

## Create the project
```
# Run from your project's root directory
npm init playwright
```

## Run tests
The first time you need to install the dependencies:
´´´
npm install
´´´
Then you can execute the tests:
´´´
npm run test
# The previous command is configured in the package.json to execute:
npx playwright test --config=playwright.config.ts
´´´
Or you can run specific test files, specify the route of the tests:
´´´
npx playwright test tests/TEST_CLASS.spec.ts --config=playwright.config.ts
´´´

## View reports
The project is configured to create a HTML report, then after the tests are executed you can run:
´´´
npx playwright show-report
´´´