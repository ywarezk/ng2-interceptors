#!/usr/bin/env bash

#
# Build and publish the package to nerdeez npm
#

npm set registry https://registry.npmjs.com
karma start karma.conf.js || { echo 'Tests failed exiting' ; exit 1; }
echo "!!!!!"
rm -R dist
npm run build
npm publish dist



