const capabilities = [
    {
        projectname: 'chrome@desktop@browserstack',
        caps: {
            'browserName': "chrome",
            'os': 'OS X',
            'os_version': 'Big Sur',
            'name': 'playwright esting with Chrome on desktop MacOS Big Sur',
            'build': 'playwright-testing-build-1',
            'browserstack.networkLogs': 'true',
            'resolution':'1920x1080'
        }
    },
    {
        projectname: 'edge@desktop@browserstack',
        caps: {
            "browserName" : "edge",
            'os': 'Windows',
            'os_version': '11',
            'name': 'playwright-testting with Edge on desktop Windows 11',
            'build': 'playwright-testing-build-1',
            'browserstack.networkLogs': 'true',
            'resolution':'1920x1080'
        }
    },
    {
        projectname: 'firefox@desktop@browserstack',
        caps: {
            "browserName" : "playwright-firefox",
            'os': 'OS X',
            'os_version': 'Monterey',
            'name': 'playwright-testing with Firefox desktop on MacOS Monterey',
            'build': 'playwright-testing-build-1',
            'browserstack.networkLogs': 'true',
            'resolution':'1920x1080'
        }
    },
    {
        projectname: 'chrome@pixel4@browserstack',
        caps: {
            'browserName': "playwright-chromium",
            'devices': 'Pixel 4',
            'os_version': '11.0',
            'real_mobile':'true',
            'name': 'playwright-testing with Chrome on a Google Pixel 4 Android 11.0',
            'build': 'playwright-testing-build-1',
            'browserstack.networkLogs': 'true',
        }
    },
    {
        projectname: 'safari@iphone12pm@browserstack',
        caps: {
            'browserName': "playwright-webkit",
            "devices": 'iPhone 12',
            "os_version": '14',
            'real_mobile':'true',
            'name': 'playwright-testing with Safari on iPhone 12 pro max iOS 14',
            'build': 'playwright-testing-build-1',
            'browserstack.networkLogs': 'true',
        }
    }
]
export function getCapability(projectName: string) {
    //search capability
    var current = capabilities.find(cap => cap.projectname === projectName).caps
    //set global caps
    current['browserstack.username'] = process.env.BROWSERSTACK_USERNAME;
    current['browserstack.accessKey'] = process.env.BROWSERSTACK_ACCESS_KEY;
    return current;
}