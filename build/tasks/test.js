var gulp = require('gulp');
var Karma = require('karma').Server;
var coveralls = require('gulp-coveralls');
var gutil = require('gulp-util');
var server = require('./server');

gulp.task('test', function (done) {
  server.start(function () {
    new Karma({
      configFile: __dirname + '/../../karma.conf.js',
      singleRun: true
    }, function (err) {
      server.stop(function () {
        if (err === 0) {
          done();
        } else {
          done(new gutil.PluginError('karma', {
            message: 'Karma Tests failed'
          }));
        }
      });
    }).start();
  });
});

gulp.task('tdd', function (done) {
  server.start(function () {
    new Karma({
      configFile: __dirname + '/../../karma.conf.js'
    }, function (err) {
      server.stop(function () {
        if (err === 0) {
          done();
        } else {
          done(new gutil.PluginError('karma', {
            message: 'Karma Tests failed'
          }));
        }
      });
    }).start();
  });
});

gulp.task('cover', function (done) {
  server.start(function () {
    new Karma({
      configFile: __dirname + '/../../karma.conf.js',
      singleRun: true,
      reporters: ['progress', 'coverage'],
      preprocessors: {
        'test/**/*.js': ['babel'],
        'src/**/*.js': ['babel']
      },
      coverageReporter: {
        dir: 'build/reports/coverage',
        includeAllSources: true,
        reporters: [
          // reporters not supporting the `file` property
          {type: 'html', subdir: 'html'},
          {type: 'lcov', subdir: 'lcov'},
          {type: 'text-summary'}
        ]
      }
    }, function (err) {
      server.stop(function () {
        if (err === 0) {
          done();
        } else {
          done(new gutil.PluginError('karma', {
            message: 'Karma Tests failed'
          }));
        }
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

gulp.task('test-api', function (done) {
  server.start(function () {
    // do nothing
  });
});
