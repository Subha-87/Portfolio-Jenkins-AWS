
properties([
    pipelineTriggers([
        githubPush()
    ])
])

node {
    stage('Clean Workspace') {
        echo 'Cleaning Jenkins workspace...'
        deleteDir()
    }

    stage('Clone Repository') {
        echo 'Cloning Portfolio repository...'

        git(
            branch: 'main',
            url: 'https://github.com/Subha-87/Portfolio-Jenkins-AWS.git'
        )
    }

    stage('Check Environment') {
        echo 'Checking Node.js and npm...'

        bat '''
            node --version
            npm --version
            git --version
        '''
    }

    stage('Install Dependencies') {
        echo 'Installing dependencies...'

        bat '''
            if exist package-lock.json (
                npm ci
            ) else (
                npm install
            )
        '''
    }

    stage('Build Next.js Application') {
        echo 'Building Next.js application...'

        bat 'npm run build'
    }

    stage('Build Successful') {
        echo '================================'
        echo 'PORTFOLIO BUILD SUCCESSFUL!'
        echo '================================'
    }
}
