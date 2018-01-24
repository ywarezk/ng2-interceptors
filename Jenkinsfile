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
import nerdeez.Docker

node('EC2') {
    try {
        stage 'Checkout'
            checkout scm
        stage 'Docker Build'
            def docker = new Docker(this)
            def imageName = docker.dockerBuild("")
        stage 'Run Tests'
            def workspace = pwd()
            sh "docker run -v $workspace/reports:/usr/app/reports $imageName node_modules/.bin/karma start karma.conf.js --single-run true --browsers PhantomJS"
            publishHTML([allowMissing: false, alwaysLinkToLastBuild: false, keepAll: false, reportDir: 'reports/coverage/', reportFiles: 'index.html', reportName: 'Coverage Report', reportTitles: ''])
            step([$class: 'JUnitResultArchiver', testResults: "reports/junit/**/*.xml"])
        stage 'Publish npm'
            try {
                withCredentials(
                  [
                    string(credentialsId: 'PUBLIC_NPM_TOKEN', variable: 'NPM_TOKEN')
                  ]
                ){
                    sh "docker run -e NPM_TOKEN=$NPM_TOKEN $imageName node_modules/.bin/ci-publish ./dist"
                }
            }
            catch(err) {
                sh "echo 'If you want to publish the version you must increase the version in package.json'"
            }
    }
    catch(err) {
        def email = new Email(this)
        email.sendErrorMessage(err.getStackTrace().toString())
        throw err
    }
}