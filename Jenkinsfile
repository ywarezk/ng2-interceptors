/**
 * This file is in charge of the build process of the library in jenkins
 *
 * Created January 22nd, 2018
 * @author: ywarezk
 * @version: 0.0.9
 * @copyright: Nerdeez Ltd
 */

@Library('nerdeez')
import nerdeez.Git
import nerdeez.Email

node('EC2') {
    try {
        stage 'Checkout'
            checkout scm
        stage 'Docker Build'
            def docker = new Docker(this)
            def imageName = docker.dockerBuild("")
        stage 'Run Tests'
            def workspace = pwd()
            sh "docker run -v $workspace/coverage:/usr/app/coverage $imageName node_modules/.bin/karma start karma.conf.js --single-run true --browsers PhantomJS"
            publishHTML([allowMissing: false, alwaysLinkToLastBuild: false, keepAll: false, reportDir: '**/coverage/', reportFiles: 'index.html', reportName: 'Coverage Report', reportTitles: ''])
    }
    catch(err) {
        def email = new Email(this)
        email.sendErrorMessage(err.getStackTrace().toString())
        throw err
    }
}