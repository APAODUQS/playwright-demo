#!/usr/bin/env groovy
pipeline {
    agent { dockerfile {filename 'docker/Dockerfile'} }
    environment {
        NPM_CONFIG_CACHE = "${WORKSPACE}/.npm"
        ENV = "${BRANCH}"
        BUILD = "${BUILD_NUMBER}"
    }    
    options {
        sidebarLinks([
            [displayName: 'Browserstack Reports', iconFileName: './browserstack/browserstack.jpeg', urlName: 'https://automate.browserstack.com']
        ])
    }
    parameters{
        booleanParam(name: 'BY_TAG', defaultValue: true, description: 'Run by the tag @playwright')
        booleanParam(name: 'RUN_LOCAL_BROWSERS', defaultValue: false, description: 'Would you like to run the tets on the local browsers? [Chrome, Safari, Firefox, Microsoft-Edge]')
        booleanParam(name: 'RUN_BROWSERSTACK', defaultValue: false, description: 'Would you like to run the tets on the Browserstack? [chrome@desktop@browserstack, edge@desktop@browserstack, firefox@desktop@browserstack, safari@desktop@browserstack]') 
        choice(name: 'RUN_PROJECT', choices: ['', 'Chrome', 'Safari', 'Firefox', 'Microsoft-Edge', 'chrome@desktop@browserstack', 'edge@desktop@browserstack', 'firefox@desktop@browserstack', 'safari@desktop@browserstack'], description: 'Select a project that you want to execute')
    }
    stages {
        stage('Checkout & Collect Info'){
            steps {
                checkout scm
                echo "Checkout: done"
            }
        }            
        stage('Build'){
            steps {
                echo "Install Dependencies"
                sh "npm install"
            }
        }
        stage('Run E2E Tests'){
            steps{
                withCredentials([
                usernamePassword(
                    credentialsId: 'jira-credentials-cc',
                    usernameVariable: 'JIRAUSERNAME',
                    passwordVariable: 'JIRAPASS'
                )
                ]){ 
                    script{
                        echo "Creating the test execution"
                        def TICKET = "DESK-12"
                        def TEST_EXECUTION = sh([script: "sh ./xray/addTestExecutionAndTestCases.sh ${JIRAUSERNAME} ${JIRAPASS} ${ENV}-${BUILD} ${TICKET}| tail -n 1", returnStdout: true]).trim()
                        echo "Run Tests"
                        sh "sh ./xray/changeStatusTestExecution.sh ${JIRAUSERNAME} ${JIRAPASS} EXECUTING ${TEST_EXECUTION}"
                        def STATUS = getStatusTests(sh([script: "${selectTestSuite()} | grep 'failed' | wc -l", returnStdout: true]).trim())
                        sh "sh ./xray/changeStatusTestExecution.sh ${JIRAUSERNAME} ${JIRAPASS} ${STATUS} ${TEST_EXECUTION}"
                    }
                }
            }
        }
    }
    post{
        always {  
            publishHTML([allowMissing: false, alwaysLinkToLastBuild: true, keepAll: true, reportDir: 'playwright-report',
                reportFiles: 'index.html', reportName: 'Playwright Report', reportTitles: 'Playwright Report'])
            script{currentBuild.displayName = "${BUILD_NUMBER}"}
            script{currentBuild.description = "Run local browsers: ${params.RUN_LOCAL_BROWSERS}, with Browserstack: ${params.RUN_BROWSERSTACK} (with the project: ${params.RUN_PROJECT})"}
        }
    }
}

def selectTestSuite(){
    switch(true){
        case params.BY_TAG:
            COMMAND = "npm run test -- --project Chrome Safari Firefox Microsoft-Edge  --grep @playwright"
            break
        case [!params.RUN_LOCAL_BROWSERS && params.RUN_BROWSERSTACK]:
            COMMAND = "npm run test:browserstack"
            break
        case [params.RUN_LOCAL_BROWSERS && !params.RUN_BROWSERSTACK]:
            COMMAND = "npm run test:local"
            break
        case [!params.RUN_LOCAL_BROWSERS && !params.RUN_BROWSERSTACK]:
            COMMAND = " npm run test -- --project ${params.RUN_PROJECT}"
            break
        default:
            echo "Executing all Browsers"
            break
    }
    return COMMAND
}

def getStatusTests(def status){
    if(status=="0"){
        return "PASS"
    } else {
        return "FAIL"
    }
}