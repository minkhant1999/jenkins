// pipeline {
//     agent any

//     // Poll SCM every minute
//     triggers {
//         pollSCM('* * * * *')
//     }

//     // Use NodeJS installed by Jenkins plugin
//     tools {
//         nodejs 'Node20'
//     }

//     environment {
//         FIREBASE_TOKEN = credentials('FIREBASE_TOKEN')
//     }

//     stages {

//         stage('Checkout') {
//             steps {
//                 checkout scm
//             }
//         }

//         stage('Install Dependencies') {
//             steps {
//                 echo 'Installing dependencies...'
//                 sh 'node -v'
//                 sh 'npm -v'
//                 sh 'npm install'
//                 sh 'npm install -g firebase-tools'
//             }
//         }

//         stage('Build Angular App') {
//             steps {
//                 echo 'Building Angular app...'
//                 sh 'npx ng build --configuration production'
//             }
//         }

//         stage('Deploy to Firebase') {
//             steps {
//                 echo 'Deploying to Firebase Hosting...'
//                 sh 'firebase deploy --token $FIREBASE_TOKEN'
//             }
//         }
//     }

//     post {
//         success {
//             echo '✅ Angular app deployed successfully to Firebase!'
//         }
//         failure {
//             echo '❌ Build or deployment failed. Check logs.'
//         }
//     }
// }


//new
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

        stage('Build Angular') {
            steps {
                script {
                    docker.image('node:18-alpine').inside {
                        sh '''
                          npm install
                          npm run build
                        '''
                    }
                }
            }
        }

        stage('Deploy to Firebase') {
            steps {
                script {
                    docker.image('node:18-alpine').inside {
                        sh '''
                          npm install -g firebase-tools
                          firebase deploy --only hosting --token "$FIREBASE_TOKEN"
                        '''
                    }
                }
            }
        }
    }
}