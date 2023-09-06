pipeline {
    agent {
        label {
            label "QAA35"
        }
    }
    stages {
        stage('Build Source') {
            steps {
                bat 'npm install';
                bat 'tsc';
            }
        }
        stage('Set Cluster SO32') {
            steps {
                bat '''cd .\\built\\conf\\
                    protractor .\\set-so32-conf.js'''   
                bat 'tsc';
            }
        }
        stage('Run all Evolve Sanity Tests on SO32') {
            steps {
                bat '''cd .\\built\\conf\\
                    protractor .\\conf.js'''
            }
        }
    }    
}