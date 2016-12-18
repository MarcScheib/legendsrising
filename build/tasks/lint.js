var gulp = require('gulp');
var paths = require('../paths');
var eslint = require('gulp-eslint');
var sassLint = require('gulp-sass-lint');

// runs eslint on all .js files
gulp.task('lint', function () {
  return gulp.src(paths.source)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('scss-lint', function() {
  return gulp.src(paths.scss)
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
});
