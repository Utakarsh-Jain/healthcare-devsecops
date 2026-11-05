pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Installing application dependencies'
                sh 'npm ci'
            }
        }

        stage('Test') {
            steps {
                echo 'Running automated tests'
                sh 'npm test'
            }
        }

        stage('SAST - SonarQube') {
            steps {
                echo 'Starting SonarQube analysis'

                script {
                    def scannerHome = tool 'SonarScanner'

                    withSonarQubeEnv('SonarQube') {
                        sh "${scannerHome}/bin/sonar-scanner"
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'Healthcare DevSecOps pipeline completed successfully!'
        }

        failure {
            echo 'Pipeline failed. Check the console output.'
        }
    }
}
