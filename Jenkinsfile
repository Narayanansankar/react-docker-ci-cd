pipeline {
    agent any

    tools {
        nodejs "node-18"   // Make sure this matches the NodeJS installation name in Jenkins
    }

    environment {
        DOCKER_IMAGE = "react-app-image"
        CONTAINER_NAME = "react-app-container"
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
                sh """
                    docker build -t $DOCKER_IMAGE .
                """
            }
        }

        stage('Run Docker Container') {
            steps {
                sh """
                    docker rm -f $CONTAINER_NAME || true
                    docker run -d --name $CONTAINER_NAME -p 3000:3000 $DOCKER_IMAGE
                """
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
