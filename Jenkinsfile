pipeline {
    agent any

    environment {
        IMAGE_NAME = "react-docker-app"
    }

    stages {

        stage('Checkout') {
            steps {
                // Checkout your repo
                git branch: 'main', url: 'https://github.com/Narayanansankar/react-docker-ci-cd.git'
            }
        }

        stage('Install & Build React App') {
            steps {
                dir('my-app') {
                    // Install dependencies
                    bat 'npm install'
                    // Build React app
                    bat 'npm run build'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Build Docker image with the latest build number
                    docker.build("${env.IMAGE_NAME}:${env.BUILD_NUMBER}", "./my-app")
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                script {
                    // Stop previous container if running
                    bat 'docker stop react-docker-app || exit 0'
                    bat 'docker rm react-docker-app || exit 0'
                    // Run container
                    bat "docker run -d --name react-docker-app -p 3000:80 ${env.IMAGE_NAME}:${env.BUILD_NUMBER}"
                }
            }
        }
    }

    post {
        success {
            echo 'Build, Docker image, and container deployment successful!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
