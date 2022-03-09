#!/usr/bin/env groovy
pipeline {
    agent { label 'agent'}
    parameters{
        string(defaultValue: '', name: 'BROWSERSTACK_USERNAME', trim: true)
        string(defaultValue: '', name: 'BROWSERSTACK_ACCESS_KEY', trim: true)         
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
                sh """
                export BROWSERSTACK_USERNAME="${params.BROWSERSTACK_USERNAME}"
                export BROWSERSTACK_ACCESS_KEY="${params.BROWSERSTACK_ACCESS_KEY}"
                """
                echo "Run Tests"
                sh "npm run test"
            }
        }
    }
    post{
        always {  
            publishHTML([allowMissing: false, alwaysLinkToLastBuild: true, keepAll: true, reportDir: 'playwright-report',
                reportFiles: "index.html", reportName: "Playwright Report"])
            script{currentBuild.description = "Broserstack report: ${BROWSERSTACK_REPORT}"}
        }
    }
}