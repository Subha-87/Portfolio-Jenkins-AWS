
node {

    def appDir = '/var/www/subhajit-portfolio-app'
    def appName = 'subhajit-portfolio'

    stage('Clean Workspace') {
        echo 'Cleaning Jenkins Workspace'
        deleteDir()
    }

    stage('Clone Repository') {
        echo 'Cloning GitHub Repository'

        git(
            branch: 'main',
            url: 'https://github.com/Subha-87/Portfolio-Jenkins-AWS.git'
        )
    }

    stage('Check Environment') {
        echo 'Checking Node.js and npm'

        sh '''
            set -e
            node -v
            npm -v
            git --version
            rsync --version
            pm2 -v
        '''
    }

    stage('Deploy Application') {

        echo 'Deploying Next.js Application'

        sh """
            set -e

            echo "Preparing deployment directory..."

            mkdir -p ${appDir}

            echo "Copying project files..."

            rsync -av --delete \
                --exclude='.git' \
                --exclude='node_modules' \
                --exclude='.next' \
                ./ ${appDir}/

            cd ${appDir}

            echo "Installing dependencies..."

            if [ -f package-lock.json ]; then
                npm ci
            else
                npm install
            fi

            echo "Building Next.js application..."

            rm -rf .next

            npm run build

            echo "Build completed successfully!"
        """
    }

    stage('Restart Application') {

        echo 'Starting or Restarting Next.js with PM2'

        sh """
            set -e

            cd ${appDir}

            if pm2 describe ${appName} >/dev/null 2>&1; then

                echo "Restarting existing application..."

                pm2 restart ${appName} --update-env

            else

                echo "Starting new application..."

                pm2 start npm --name "${appName}" -- start

            fi

            pm2 save
        """
    }

    stage('Deployment Status') {

        sh """
            echo "Checking PM2 application status..."

            pm2 status

            echo "Checking application response..."

            sleep 5

            curl -f http://localhost:3000 || exit 1
        """

        echo 'Next.js Deployment Successful!'
    }

}
