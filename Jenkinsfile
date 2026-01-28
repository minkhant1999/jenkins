pipeline {
    // Use Node.js Docker container for building Angular
    agent {
        docker { 
            image 'node:18-alpine'
            args '-u root:root' // optional: run as root inside container
        }
    }

    // Environment variables
    environment {
        FIREBASE_TOKEN = credentials('FIREBASE_TOKEN') // Jenkins secret text ID
        APP_NAME = "jenkins" // Replace with your Angular app name
    }

    stages {
        // Stage 1: Checkout the code
        stage('Checkout') {
            steps {
                echo "Checking out code from Git..."
                checkout scm
            }
        }

        // Stage 2: Install dependencies
        stage('Install Dependencies') {
            steps {
                echo "Installing npm dependencies..."
                sh 'npm install'
                echo "Installing Firebase CLI..."
                sh 'npm install -g firebase-tools'
            }
        }

        // Stage 3: Build Angular App
        stage('Build Angular') {
            steps {
                echo "Building Angular app for production..."
                sh 'ng build --configuration production'
            }
        }

        // Stage 4: Deploy to Firebase
        stage('Deploy to Firebase') {
            steps {
                echo "Deploying Angular app to Firebase Hosting..."
                sh 'firebase deploy --token $FIREBASE_TOKEN'
            }
        }
    }

    post {
        success {
            echo "✅ Deployment successful! Your app is live on Firebase."
        }
        failure {
            echo "❌ Deployment failed. Check Jenkins logs."
        }
    }
}
