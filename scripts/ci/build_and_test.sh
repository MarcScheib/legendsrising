#!/bin/bash

echo =============================================================================
# go to project dir
SCRIPT_DIR=$(dirname $0)

cd $SCRIPT_DIR/../..

./node_modules/.bin/gulp build
./node_modules/.bin/gulp test