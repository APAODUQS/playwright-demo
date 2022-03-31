#!/usr/bin/env groovy
pipeline {
    agent { label 'agent'}
    parameters{
        booleanParam(name: 'RUN_LOCAL_BROWSERS', defaultValue: true, description: 'Would you like to run the tets on the local browsers? [Chrome, Safari, Firefox, Microsoft-Edge]')
        booleanParam(name: 'RUN_BROWSERSTACK', defaultValue: false, description: 'Would you like to run the tets on the Browserstack? [chrome@desktop@browserstack, edge@desktop@browserstack, firefox@desktop@browserstack, safari@desktop@browserstack]') 
        choice(name: 'RUN_PROJECT', choices: ['', 'Chrome', 'Safari', 'Firefox', 'Microsoft-Edge', 'chrome@desktop@browserstack', 'edge@desktop@browserstack', 'firefox@desktop@browserstack', 'safari@desktop@browserstack'], description: 'Select a project that you want to execute')
    }
    stages {
        stage('Checkout & Collect Info'){
            steps {
                checkout scm
                echo "Checkout: done"
                sh """
                export ENV="${GIT_BRANCH}"
                export BUILD="${BUILD_NUMBER}"
                export LOCAL_BS=false
                """
            }
        }            
        stage('Build'){
            steps {
                echo "Install Dependencies"
                sh "npm install"
                echo 'Install supported browsers'
                sh 'npx playwright install'
            }
        }
        stage('Run E2E Tests'){
            steps{
                echo "Run Tests"
                sh selectTestSuite()
            }
        }
    }
    post{
        always {  
            publishHTML([allowMissing: false, alwaysLinkToLastBuild: true, keepAll: true, reportDir: 'playwright-report',
                reportFiles: 'index.html', reportName: 'Playwright Report', reportTitles: 'Playwright Report'])
            script{currentBuild.description = "Run local browsers: ${params.RUN_LOCAL_BROWSERS}, with Browserstack: ${params.RUN_BROWSERSTACK} wwith the project(${params.RUN_PROJECT})"}
        }
    }
}

def selectTestSuite(){
    switch(true){
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