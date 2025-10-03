pipeline {
  agent any

  environment {
    IMAGE = "your-dockerhub-username/react-docker-ci-cd"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install & Build') {
      steps {
        dir('my-app') {
          sh 'npm ci'
          sh 'npm run build'
        }
      }
    }

    stage('Build Docker Image') {
      steps {
        sh "docker build -t ${IMAGE}:$BUILD_NUMBER ."
      }
    }

    stage('Push Image') {
      environment {
        DOCKERHUB = credentials('dockerhub-creds') // username/password stored in Jenkins
      }
      steps {
        sh "echo ${DOCKERHUB_PSW} | docker login -u ${DOCKERHUB_USR} --password-stdin"
        sh "docker push ${IMAGE}:$BUILD_NUMBER"
      }
    }

    stage('Deploy') {
      steps {
        // stop old container, remove, run new - adjust as needed for your environment
        sh '''
          docker rm -f react-docker-app || true
          docker run -d --name react-docker-app -p 3000:80 ${IMAGE}:$BUILD_NUMBER
        '''
      }
    }
  }
}
