var gulp = require('gulp');
var bundler = require('aurelia-bundler');
var bundles = require('../bundles.json');

gulp.task('bundle', ['build'], function () {
  return bundler.bundle(bundles);
});

gulp.task('unbundle', function () {
  return bundler.unbundle(bundles);
});
