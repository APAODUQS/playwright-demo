# playwright-demo

## Requeriments

You need to have Node.js installed. We are using the playwright library for executing tests, then you have to install the library and the supported browsers:

```
npm i -D @playwright/test
#install supported browsers
npx playwright install
```

## Create the project

```
#Run from your project's root directory
npm init playwright
```

## Run tests

The first time you need to install the dependencies:

```
npm install
```

Then you can execute the tests:

```
npm run test
# The previous command is configured in the package.json to execute:
npx playwright test --config=playwright.config.ts
```

Or you can run specific test files, specify the route of the tests:

```
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

```
npm run lint
// that runs:
eslint '**/*.{js,ts,tsx}' --quiet
```

And if you want to fix errors that can be fixed autocally, you can execute:
`eslint '**/*.{js,ts,tsx}' --quiet --fix`

And finally if you want preventing formatting errors from being committed or pushed, you can add `husky` to your project. More information: https://robertcooper.me/post/using-eslint-and-prettier-in-a-typescript-project
