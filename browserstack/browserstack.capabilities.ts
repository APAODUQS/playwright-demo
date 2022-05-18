import cp from 'child_process'
const clientPlaywrightVersion = cp.execSync('npx playwright --version').toString().trim().split(' ')[1]
let environment = 'local'
let build = process.env.USER

const capabilities = [
  {
    projectname: 'chrome@desktop@browserstack',
    browserName: 'chrome',
    os: 'OS X',
    os_version: 'Big Sur',
    name: 'Chrome on desktop MacOS Big Sur',
  },
  {
    projectname: 'edge@desktop@browserstack',
    browserName: 'edge',
    os: 'Windows',
    os_version: '11',
    name: 'Edge on desktop Windows 11',
  },
  {
    projectname: 'firefox@desktop@browserstack',
    browserName: 'playwright-firefox',
    os: 'OS X',
    os_version: 'Monterey',
    name: 'Firefox desktop on MacOS Monterey',
  },
  {
    projectname: 'safari@desktop@browserstack',
    browserName: 'playwright-webkit',
    os: 'OS X',
    os_version: 'Monterey',
    name: 'Safari desktop on MacOS Monterey',
  },
  // TODO: Currently Browserstack does not support mobile devices for Playwright.
  //       When Browserstack support mobile devices, we could implement them
  // {
  //   projectname: 'chrome@pixel4@browserstack',
  //   browserName: 'playwright-chromium',
  //   devices: 'Pixel 4',
  //   os_version: '11.0',
  //   real_mobile: 'true',
  //   name: 'Chrome on a Google Pixel 4 Android 11.0',
  // },
  // {
  //   projectname: 'safari@iphone12@browserstack',
  //   browserName: 'playwright-webkit',
  //   devices: 'iPhone 12',
  //   os_version: '14',
  //   real_mobile: 'true',
  //   name: 'Safari on iPhone 12 pro max iOS 14',
  // },
]

export function getCapability(projectName: string) {
  //search capability
  const current = capabilities.find((cap) => cap.projectname === projectName)
  // Project name
  current['project'] = 'fnf-testing'
  current['browserstack.local'] = process.env.LOCAL_BS
  if (current['browserstack.local']!) {
    environment = process.env.ENV
    build = process.env.BUILD
  }
  if (current.name.match(/desktop/)) {
    // screen resolution
    current['resolution'] = '1920x1080'
    current['browserstack.realMobileInteraction'] = false
    current['realMobile'] = false
    current['browserstack.appiumLogs'] = false
  }
  current['browser_version'] = 'latest'
  current['playwrightVersion'] = clientPlaywrightVersion
  // Set the name build with the Jenkins build
  current['build'] = `playwright-demo-${environment}-${build}`
  // Active Visual Logs automatically capture screenshots at every Playwright command executed during your test
  current['browserstack.debug'] = true
  // Get a comprehensive log of all network activity during your Playwright tests
  current['browserstack.networkLogs'] = true
  // Console Logs capture the browser’s console output at various steps of the test to troubleshoot JavaScript issues
  // possible values: disable, errors, warnings, info, verbose
  current['browserstack.console'] = 'info'
  // set global capabilities
  current['browserstack.username'] = process.env.BROWSERSTACK_USERNAME
  current['browserstack.accessKey'] = process.env.BROWSERSTACK_ACCESS_KEY

  return current
}
