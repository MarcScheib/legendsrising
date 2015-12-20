var path = require('path');
var fs = require('fs');

var appRoot = 'src/';
var outputRoot = 'dist/';
var scssRoot = 'scss/';
var cssRoot = 'style/';
var exportSrvtRoot = 'export/';
var pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

module.exports = {
  root: appRoot,
  source: appRoot + '**/*.js',
  json: appRoot + '**/*.json',
  html: appRoot + '**/*.html',
  style: scssRoot + '**/*.scss',
  output: outputRoot,
  cssOutput: cssRoot,
  exportSrv: exportSrvtRoot,
  doc:'./doc',
  tests: 'test/**/*.js',
  e2eSpecsSrc: 'test/e2e/src/*.js',
  e2eSpecsDist: 'test/e2e/dist/',
  packageName: pkg.name
};
