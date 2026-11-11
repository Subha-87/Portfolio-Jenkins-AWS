pipeline {
    agent any

    environment {
        CONTAINER_NAME = "portfolio-app"
        IMAGE_NAME ="portfolio-image:V1"
        EMAIL ="subhajit87@gmail.com"
        PORT ="3000"
    }

    stages {
        stage('Clone Repo'){
            echo 'Step 1.Cloning Portfolio repository...'

            steps{
                git branch:'main',url:'https://github.com/Subha-87/Portfolio-Jenkins-AWS.git'
            }
        }
        stage('Building Docker Image'){

            echo 'Step 2. Creating of Docker Image...'
            steps{
               sh 'docker build -t $IMAGE_NAME .'
            }
        }
        stage('Stop & Remove Previous Container'){

            echo 'Step 3. Check Previous Container Status...'
            steps{
               sh '''
                  docker stop $CONTAINER_NAME || true
                  docker rm $CONTAINER_NAME || true
               '''
            }
        }
        stage('Run Container'){

            echo 'Step 4. Prepare to Run Container...'
            steps{
               sh '''
                  docker run -d -p$PORT:$PORT --name $CONTAINER_NAME --$IMAGE_NAME
                  docker rm $CONTAINER_NAME || true
               '''
            }
        }
        stage('EMAIL Notification'){
            echo 'Step 5. Sending Email Notification...'
            steps{
                emailext(
                    subject:"PORTFOLIO APP DEPLOYED Successfull on EC2",
                    body: "Hooray!! App deplyment is successull on http://52.64.224.163:${PORT}/",
                    to:"${EMAIL}"
                )
            }
        }
    }
}