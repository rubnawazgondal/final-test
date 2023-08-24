pipeline { 
	 agent any 
	 stages { 
		 stage('Clone repository') { 
			 steps { 
				 sh 'cd /home/microservices'
				 git credentialsId: 'gitcredentional', url: 'https://github.com/rubnawazgondal/final-test.git'
			 } 
		 }
		stage('Build') { 
			 steps  {
				 sh 'docker build -t selteq2/staging-final-test:latest -f Dockerfile .'
				 sh 'docker images'
				 sh 'docker stop staging-final-test' 
				 sh 'docker rm staging-final-test' 
				 sh 'docker create --name staging-final-test -p 4001:3000 selteq2/staging-final-test:latest' 
				 sh 'docker ps' 
				 sh 'docker start staging-final-test' 
				 sh 'docker push selteq2/staging-final-test:latest' 
			 } 
		 } 
	 } 
 } 
