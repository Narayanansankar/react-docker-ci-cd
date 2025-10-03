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
pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "react-app-image"
        CONTAINER_NAME = "react-app-container"
    }

    stages {
        stage('Checkout SCM') {
            steps {
                // Use Linux shell, check out main branch
                git branch: 'main', url: 'https://github.com/Narayanansankar/react-docker-ci-cd.git'
            }
        }

        stage('Install & Build React App') {
            steps {
                dir('my-app') {
                    sh '''
                    echo "Installing dependencies..."
                    npm install
                    echo "Building React app..."
                    npm run build
                    '''
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                echo "Building Docker image..."
                docker build -t $DOCKER_IMAGE .
                '''
            }
        }

        stage('Run Docker Container') {
            steps {
                sh '''
                echo "Stopping old container if exists..."
                docker rm -f $CONTAINER_NAME || true
                echo "Running new container..."
                docker run -d --name $CONTAINER_NAME -p 3000:3000 $DOCKER_IMAGE
                '''
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
