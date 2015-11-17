var path = require('path');

var appRoot = 'resources/assets/';
var outputRoot = 'public/assets/';
var exporSrvtRoot = 'export/';

module.exports = {
  root: appRoot,
  source: appRoot + '**/*.js',
  json: appRoot + '**/*.json',
  html: appRoot + '**/*.html',
  style: appRoot + '**/*.scss',
  output: outputRoot,
  exportSrv: exporSrvtRoot,
  doc:'./',
  e2eSpecsSrc: 'resources/test/e2e/src/*.js',
  e2eSpecsDist: 'resources/test/e2e/dist/'
};
