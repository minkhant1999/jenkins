pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                sh '''
                  npm install
                  npm run build
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                  docker stop angular-app || true
                  docker rm angular-app || true
                  docker build -t angular-app .
                  docker run -d -p 4200:80 angular-app
                '''
            }
        }
    }
}
