pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "react-app:latest"
        CONTAINER_NAME = "react-app-container"
        APP_PORT = "3000"
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/Narayanansankar/react-docker-ci-cd.git'
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
                    docker build -t $DOCKER_IMAGE ./my-app
                """
            }
        }

        stage('Run Docker Container') {
            steps {
                sh """
                    # Stop previous container if exists
                    if [ \$(docker ps -aq -f name=$CONTAINER_NAME) ]; then
                        docker rm -f $CONTAINER_NAME
                    fi

                    # Run new container
                    docker run -d -p $APP_PORT:3000 --name $CONTAINER_NAME $DOCKER_IMAGE
                """
            }
        }
    }

    post {
        success {
            echo "Pipeline completed successfully!"
        }
        failure {
            echo "Pipeline failed!"
        }
    }
}
