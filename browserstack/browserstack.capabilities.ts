import cp from 'child_process'
const clientPlaywrightVersion = cp.execSync('npx playwright --version').toString().trim().split(' ')[1]

const capabilities = [
  {
    projectname: 'chrome@desktop@browserstack',
    caps: {
      browserName: 'chrome',
      os: 'OS X',
      os_version: 'Big Sur',
      name: 'Chrome on desktop MacOS Big Sur',
      resolution: '1920x1080',
    },
  },
  {
    projectname: 'edge@desktop@browserstack',
    caps: {
      browserName: 'edge',
      os: 'Windows',
      os_version: '11',
      name: 'Edge on desktop Windows 11',
      resolution: '1920x1080',
    },
  },
  {
    projectname: 'firefox@desktop@browserstack',
    caps: {
      browserName: 'playwright-firefox',
      os: 'OS X',
      os_version: 'Monterey',
      name: 'Firefox desktop on MacOS Monterey',
      resolution: '1920x1080',
    },
  },
  // Currently Browserstack does not support mobile devices for Playwright
  // {
  //   projectname: 'chrome@pixel4@browserstack',
  //   caps: {
  //     browserName: 'playwright-chromium',
  //     devices: 'Pixel 4',
  //     os_version: '11.0',
  //     real_mobile: 'true',
  //     name: 'Chrome on a Google Pixel 4 Android 11.0',
  //   },
  // },
  // {
  //   projectname: 'safari@iphone12@browserstack',
  //   caps: {
  //     browserName: 'playwright-webkit',
  //     devices: 'iPhone 12',
  //     os_version: '14',
  //     real_mobile: 'true',
  //     name: 'Safari on iPhone 12 pro max iOS 14',
  //   },
  // },
]

export function getCapability(projectName: string) {
  //search capability
  const current = capabilities.find((cap) => cap.projectname === projectName).caps
  current['playwrightVersion'] = clientPlaywrightVersion
  current['browserstack.build'] = 'playwright-testing-build'
  current['browserstack.networkLogs'] = 'true'
  current['browserstack.console'] = 'info'
  //set global caps
  current['browserstack.username'] = process.env.BROWSERSTACK_USERNAME
  current['browserstack.accessKey'] = process.env.BROWSERSTACK_ACCESS_KEY
  return current
}
