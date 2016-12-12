var paths = require('./build/paths');

module.exports = function(config) {
  var configuration = {
    basePath: '',

    frameworks: ['jspm', 'jasmine'],

    jspm: {
      loadFiles: ['test/unit/setup.js', 'test/unit/**/*.js'],
      serveFiles: ['src/**/*.*'],
      paths: {
        '*': 'src/*',
        'test/*': 'test/*',
        'github:*': 'jspm_packages/github/*',
        'npm:*': 'jspm_packages/npm/*'
      }
    },

    // list of files / patterns to load in the browser
    files: [
      {pattern: 'aurelia.env', watched: false, included: false, served: true, nocache: false}
    ],

    proxies: {
      '/aurelia.env': '/base/aurelia.env'
    },

    // list of files to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      [paths.tests]: ['babel'],
      [paths.source]: ['babel']
    },

    'babelPreprocessor': {
      options: {
        sourceMap: 'inline',
        presets: [ ['es2015', { loose: true }], 'stage-1'],
        plugins: [
          'syntax-flow',
          'transform-decorators-legacy',
          'transform-flow-strip-types'
        ]
      }
    },

    reporters: ['progress'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },

    browsers: ['Chrome'],

    singleRun: false
  };

  if (process.env.TRAVIS) {
    configuration.browsers = ['Chrome_travis_ci'];
  }

  config.set(configuration);
};
