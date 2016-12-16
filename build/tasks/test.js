var gulp = require('gulp');
var Karma = require('karma').Server;
var coveralls = require('gulp-coveralls');
var server = require('./server');

gulp.task('test', function (done) {
  server.start(function () {
    new Karma({
      configFile: __dirname + '/../../karma.conf.js',
      singleRun: true
    }, function (e) {
      server.stop(function () {
        done();
      });
    }).start();
  });
});

gulp.task('tdd', function (done) {
  server.start(function () {
    new Karma({
      configFile: __dirname + '/../../karma.conf.js'
    }, function (e) {
      server.stop(function () {
        done();
      });
    }).start();
  });
});

gulp.task('cover', function (done) {
  server.start(function () {
    new Karma({
      configFile: __dirname + '/../../karma.conf.js',
      singleRun: true,
      reporters: ['coverage'],
      preprocessors: {
        'test/**/*.js': ['babel'],
        'src/**/*.js': ['babel', 'coverage']
      },
      coverageReporter: {
        dir: 'build/reports/coverage',
        reporters: [
          // reporters not supporting the `file` property
          {type: 'html', subdir: 'html'},
          {type: 'lcov', subdir: 'lcov'},
          {type: 'text-summary'}
        ]
      }
    }, function () {
      server.stop(function () {
        done();
      });
    }).start();
  });
});

/**
 * Report coverage to coveralls
 */
gulp.task('coveralls', ['cover'], function (done) {
  gulp.src('build/reports/coverage/lcov/lcov.info')
    .pipe(coveralls());
});
