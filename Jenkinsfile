pipeline {
    agent any

    environment {
        IMAGE_NAME = "react-docker-app"
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Narayanansankar/react-docker-ci-cd.git'
            }
        }

        stage('Install & Build React App') {
            steps {
                dir('my-app') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${env.IMAGE_NAME}:${env.BUILD_NUMBER}", "./my-app")
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                script {
                    sh 'docker stop react-docker-app || true'
                    sh 'docker rm react-docker-app || true'
                    sh "docker run -d --name react-docker-app -p 3000:80 ${env.IMAGE_NAME}:${env.BUILD_NUMBER}"
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
