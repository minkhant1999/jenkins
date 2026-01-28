pipeline {
    agent {
        docker { image 'node:18-alpine' } // Node environment
    }

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
                sh 'npm install'
                sh 'npm install -g firebase-tools'
            }
        }

        stage('Build Angular') {
            steps {
                sh 'ng build --configuration production'
            }
        }

        stage('Deploy to Firebase') {
            steps {
                sh 'firebase deploy --token $FIREBASE_TOKEN'
            }
        }
    }
}
