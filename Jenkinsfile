pipeline {
    agent any

    stages {

        stage('Clone Repository') {
            steps {
                git 'https://github.com/shaileshw108/1SmartViz.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'pip install fastapi uvicorn pandas'
            }
        }

        stage('Run Application') {
            steps {
                bat 'python -m uvicorn main:app --host 127.0.0.1 --port 8000'
            }
        }

    }
}
