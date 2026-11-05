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
                script {
                    def scannerHome = tool 'SonarScanner'

                    withSonarQubeEnv('SonarQube') {
                        sh "${scannerHome}/bin/sonar-scanner"
                    }
                }
            }
        }

        stage('Docker Build') {
            steps {
                sh 'docker build -t healthcare-devsecops:v2 .'
            }
        }

        stage('Trivy Security Scan') {
            steps {
                sh 'trivy image --severity HIGH,CRITICAL healthcare-devsecops:v2'
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
