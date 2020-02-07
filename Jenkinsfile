pipeline {
  agent any

  tools {nodejs "NodeJS"}

  stages {
    stage('Cloning Git') {
      steps {
        git ''
      }
    }

    stage('Install dependencies') {
      steps {
        sh 'npm install'
      }
    }

    stage("Test"){
      steps {
        sh 'npm run test:online'
      }  
    }
  }
}