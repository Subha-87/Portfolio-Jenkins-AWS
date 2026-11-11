
pipeline {
    agent any

    environment {
        CONTAINER_NAME = "portfolio-app"
        IMAGE_NAME = "portfolio-image:v1"
        EMAIL = "subhajit87@gmail.com"
        PORT = "3000"
    }

    stages {

        stage('Clone Repository') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Subha-87/Portfolio-Jenkins-AWS.git'
            }
        }

        stage('Check Docker') {
            steps {
                sh '''
                    docker --version
                    docker info
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                    docker build -t $IMAGE_NAME .
                '''
            }
        }

        stage('Stop Previous Container') {
            steps {
                sh '''
                    docker stop $CONTAINER_NAME || true
                    docker rm $CONTAINER_NAME || true
                '''
            }
        }

        stage('Run New Container') {
            steps {
                sh '''
                    docker run -d \
                      --name $CONTAINER_NAME \
                      --restart unless-stopped \
                      -p $PORT:3000 \
                      $IMAGE_NAME
                '''
            }
        }

        stage('Verify Deployment') {
            steps {
                sh '''
                    sleep 5
                    docker ps
                    curl --fail http://localhost:$PORT
                '''
            }
        }

        stage('Email Notification') {
            steps {
                emailext(
                    subject: "Portfolio App Deployment Successful on EC2",
                    body: "Your portfolio application is deployed successfully at http://52.64.224.163:${PORT}/",
                    to: "${EMAIL}"
                )
            }
        }
    }
}
