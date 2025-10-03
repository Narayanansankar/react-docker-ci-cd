pipeline {
    agent any

    tools {
        nodejs "node-18"  // This tells Jenkins to use the NodeJS installation you configured
    }

    environment {
        // any environment variables
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
                sh 'docker build -t react-app-image .'
            }
        }

        stage('Run Docker Container') {
            steps {
                sh 'docker run -d -p 3000:3000 react-app-image'
            }
        }
    }

    post {
        failure {
            echo 'Pipeline failed!'
        }
        success {
            echo 'Pipeline completed successfully!'
        }
    }
}
