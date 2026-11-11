
pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out source code'
                checkout scm
            }
        }

        stage('Verify Frontend') {
            steps {
                sh 'ls -l frontend/'
            }
        }

        stage('Deploy to S3') {
            steps {
                sh '''
                    aws s3 sync frontend/ s3://support-ticket-frontend-mahi-2026-unique/ --delete
                '''
            }
        }
    }

    post {
        success {
            echo 'Frontend deployment completed successfully!'
        }
        failure {
            echo 'Frontend deployment failed!'
        }
    }
}
