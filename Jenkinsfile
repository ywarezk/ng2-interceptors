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
        stage 'Run tests'
            sh "npm test"
            publishHTML([allowMissing: false, alwaysLinkToLastBuild: false, keepAll: false, reportDir: '**/coverage/', reportFiles: 'index.html', reportName: 'Coverage Report', reportTitles: ''])
    }
    catch(err) {
        def email = new Email(this)
        email.sendErrorMessage(err.getStackTrace().toString())
        throw err
    }
}