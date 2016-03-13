var isparta = require('isparta');
var paths = require('./build/paths');
var babelOptions = require('./build/babel-options');

module.exports = function (config) {
  var configuration = {
    basePath: '',

    frameworks: ['jspm', 'jasmine'],

    jspm: {
      loadFiles: ['test/unit/setup.js', paths.tests],
      serveFiles: [paths.source],
      paths: {
        '*': '*',
        'github:*': 'jspm_packages/github/*',
        'npm:*': 'jspm_packages/npm/*'
      }
    },

    // list of files / patterns to load in the browser
    files: [],

    // list of files to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      [paths.tests]: ['babel'],
      [paths.source]: ['babel', 'sourcemap', 'coverage']
    },

    babelPreprocessor: {
      options: {
        loose: babelOptions.loose,
        stage: babelOptions.stage,
        optional: babelOptions.optional,
        sourceMap: 'inline'
      }
    },

    reporters: ['coverage', 'progress'],

    coverageReporter: {
      instrumenters: {
        isparta: isparta
      },

      instrumenter: {
        [paths.source]: 'isparta'
      },

      dir: 'build/reports/coverage/',

      reporters: [{
        type: 'text-summary'
      }, {
        type: 'html',
        subdir: 'html'
      }, {
        type: 'lcovonly',
        subdir: 'lcov',
        file: 'report-lcovonly.txt'
      }]
    },

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

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  };

  if (process.env.TRAVIS) {
    configuration.browsers = ['Chrome_travis_ci'];
  }

  config.set(configuration);
};
