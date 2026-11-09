node {
    def appDir = '/var/www/subhajit-portfolio-app'

    stage('Cleane Workspace'){
    echo 'Cleaning Jenkins Workspace'
    deleteDir()
    }

    stage('Clone Repo'){
        echo 'Cloning the Git Repositories'
        git(
            branjc:'main',
            url:'https://github.com/Subha-87/Portfolio-Jenkins-AWS'
        )
    }

    stage('Deploy to AMAZON EC2'){
        echo 'Deploying Project to EC2'
        sh """
           sudo mkdir -p ${appDir}
           sudo chown -R
           jenkins:jenkins ${appDir}

           rsync -av  --delete
           --exclude='.git' --exclude='node_modules'
           ./ ${appDir}

           cd ${appDir}
           sudo npm install
           sudo npm run build

           sudo fuser -k 3000/tcp || true
           npm run start

        """

    }

}