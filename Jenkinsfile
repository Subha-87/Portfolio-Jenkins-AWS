
properties([
    pipelineTriggers([
        githubPush()
    ])
])

node {
    stage('Start Pipeline') {
        echo 'Local Jenkins pipeline started successfully!'
    }

    stage('Install Dependencies') {
        echo 'Dependencies installation stage completed (testing only).'
    }

    stage('Build Application') {
        echo 'Build stage completed (testing only).'
    }

    stage('Pipeline Success') {
        echo '======================================'
        echo 'LOCAL JENKINS PIPELINE SUCCESSFUL!'
        echo '======================================'
    }
}
