pipeline {
    agent any

    environment {
        IMAGE_NAME = "react-docker-app"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/narayanansankar/react-docker-ci-cd.git'
            }
        }

        stage('Install & Build') {
            steps {
                dir('my-app') {
                    bat 'npm install'
                    bat 'npm run build'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t %IMAGE_NAME% .'
            }
        }

        stage('Run Container') {
            steps {
                bat '''
                  docker rm -f react-container || exit 0
                  docker run -d -p 3000:80 --name react-container %IMAGE_NAME%
                '''
            }
        }
    }
}
