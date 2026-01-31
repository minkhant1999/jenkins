pipeline {
    agent any

    // Poll SCM every minute
    triggers {
        pollSCM('* * * * *')
    }

    // Use NodeJS installed by Jenkins plugin
    tools {
        nodejs 'Node20'
    }

    environment {
        FIREBASE_TOKEN = credentials('FIREBASE_TOKEN')
    }

    stages {

        stage('Checkout') { //Jenkins will checkout the code from the repository to the workspace
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') { //Jenkins will install the dependencies for the project using node from tools  in the workspace read from package.json same as our local machine
            steps {
                echo 'Installing dependencies...'
                sh 'node -v'
                sh 'npm -v'
                sh 'npm install'
                sh 'npm install -g firebase-tools'
            }
        }

        stage('Build Angular App') { //Jenkins will build the Angular app in the workspace same as our local machine
            steps {
                echo 'Building Angular app...'
                sh 'npx ng build --configuration production'
            }
        }

        stage('Run with Docker') { //Build Docker image and run the app on port 8181
            steps {
                echo 'Building Docker image and running on port 8181...'
                sh 'docker build -t aquatic-plants:latest .'
                sh 'docker stop aquatic-plants || true'
                sh 'docker rm aquatic-plants || true'
                sh 'docker run -d -p 8181:80 --name aquatic-plants aquatic-plants:latest'
                echo 'App is running at http://<jenkins-host>:8181'
            }
        }

        stage('Deploy to Firebase') { //Jenkins will deploy the Angular app to Firebase Hosting as we have set up in the project
            steps {
                echo 'Deploying to Firebase Hosting...'
                sh 'firebase deploy --token $FIREBASE_TOKEN'
            }
        }
    }

    post {
        success {
            echo '✅ Angular app deployed successfully to Firebase!'
        }
        failure {
            echo '❌ Build or deployment failed. Check logs.'
        }
    }
}


