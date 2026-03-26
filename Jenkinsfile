pipeline {
    agent any
    tools{
        nodejs 'NodeJS'
        allure 'Allure'
    }
    environment {
        BASE_URL = "https://newmamtamobiles-eight.vercel.app/"
    }
    triggers{
        pollSCM('H/2 * * * *')       
        cron('0 0 */2 * *')         
    }
    stages{
        stage('Checkout code') {
            steps {
                git branch: 'main', url: 'https://github.com/Aash1236/Mamta_mobiles_Automation.git'
            }
        }
        stage('Install Dependencies') {
            steps{
                bat 'npm install'
            }
        }
        stage('Install Browser') {
            steps{
                bat '''
        IF NOT EXIST "%USERPROFILE%\\AppData\\Local\\ms-playwright" (
            echo Installing Playwright browsers...
            npx playwright install chromium
        ) ELSE (
            echo Browsers already installed, skipping...
        )
        '''
            }
        }
        stage('Run Tests') {
            environment{
                ADMIN_EMAIL = credentials('admin-creds').username
                ADMIN_PASSWORD = credentials('admin-creds').password
            }
            steps{
                bat 'npx playwright test'
            }
        }
        stage('Generate Allure Report') {
            steps {
                bat 'allure generate allure-results --clean -o allure-report'
            }
        }
    }
    post{
        always {
             archiveArtifacts artifacts: 'allure-report/**', allowEmptyArchive: true
        }
        success {
            echo '✅ Build Successful'
        }
        failure {
            echo '❌ Build Failed'
        }
    }
}