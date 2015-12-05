var appRoot = 'src/';
var outputRoot = 'dist/';
var scssRoot = 'scss/';
var cssRoot = 'style/';
var exportSrvtRoot = 'export/';

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
  e2eSpecsSrc: 'test/e2e/src/*.js',
  e2eSpecsDist: 'test/e2e/dist/'
};
