pipeline {
    agent any

    environment {
        FIREBASE_TOKEN = credentials('FIREBASE_TOKEN')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'node -v'
                sh 'npm -v'
                sh 'npm install'
                sh 'npm install -g firebase-tools'
            }
        }

        stage('Build Angular') {
            steps {
                sh 'npx ng build --configuration production'
            }
        }

        stage('Deploy to Firebase') {
            steps {
                sh 'firebase deploy --token $FIREBASE_TOKEN'
            }
        }
    }

    post {
        success {
            echo '✅ Firebase deployment successful'
        }
        failure {
            echo '❌ Firebase deployment failed'
        }
    }
}
