try {
   timeout(time: 20, unit: 'MINUTES') {
      node('nodejs') {
          stage('build') {
            openshiftBuild(buildConfig: 'micro-example', showBuildLogs: 'true')
          }
          stage('deploy') {
            openshiftDeploy(deploymentConfig: 'micro-example')
          }
        }
   }
} catch (err) {
   echo "in catch block"
   echo "Caught: ${err}"
   currentBuild.result = 'FAILURE'
   throw err
}