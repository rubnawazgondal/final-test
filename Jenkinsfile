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
				 sh 'docker build -t selteq2/final-test:latest -f Dockerfile .'
				 sh 'docker images'
				 //sh 'docker stop final-test' 
				 //sh 'docker rm final-test' 
				 sh 'docker create --name final-test -p 4000:3000 selteq2/final-test:latest' 
				 sh 'docker ps' 
				 sh 'docker start final-test' 
				 sh 'docker push selteq2/final-test:latest' 
			 } 
		 } 
	 } 
 } 