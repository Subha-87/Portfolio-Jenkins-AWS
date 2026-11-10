properties([
    pipelineTriggers([
        githubPush()
    ])
])

node {

    def appDir = '/var/www/subhajit-portfolio-app'
    def appName = 'subhajit-portfolio'

    stage('Clean Workspace') {
        echo 'Cleaning Jenkins workspace'
        deleteDir()
    }

    stage('Clone Repository') {
        echo 'Cloning Portfolio repository'

        git(
            branch: 'main',
            url: 'https://github.com/Subha-87/Portfolio-Jenkins-AWS.git'
        )
    }

    stage('Check Environment') {
        echo 'Checking deployment environment'

        sh '''
            set -e

            echo "Node:"
            node -v

            echo "NPM:"
            npm -v

            echo "Git:"
            git --version

            echo "PM2:"
            pm2 -v
        '''
    }

    stage('Deploy Application') {

        echo 'Deploying Next.js application'

        sh """
            set -e

            echo "Preparing application directory..."

            sudo mkdir -p ${appDir}
            sudo chown -R jenkins:jenkins ${appDir}

            echo "Syncing project files..."

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

            npm run build

            echo "Build completed successfully!"
        """
    }

    stage('Restart Next.js') {

        echo 'Restarting Next.js application with PM2'

        sh """
            set -e

            cd ${appDir}

            if pm2 describe ${appName} > /dev/null 2>&1; then

                echo "Existing PM2 process found"
                echo "Restarting ${appName}"

                pm2 restart ${appName} --update-env

            else

                echo "PM2 process does not exist"
                echo "Starting ${appName}"

                pm2 start npm \
                    --name "${appName}" \
                    -- start
            fi

            pm2 save
        """
    }

    stage('Verify Application') {

        echo 'Verifying Next.js application'

        sh """
            sleep 5

            pm2 status

            echo "Testing localhost:3000..."

            curl -f http://localhost:3000

            echo ""
            echo "======================================"
            echo "DEPLOYMENT SUCCESSFUL"
            echo "======================================"
        """
    }
}