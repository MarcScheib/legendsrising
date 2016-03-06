var gulp = require('gulp');
var runSequence = require('run-sequence');
var paths = require('../paths');
var changelog = require('gulp-conventional-changelog');
var fs = require('fs');
var bump = require('gulp-bump');
var args = require('../args');

// utilizes the bump plugin to bump the
// semver for the repo
gulp.task('bump-version', function () {
  return gulp.src(['./package.json'], {base: './'})
    .pipe(bump({type: args.bump})) //major|minor|patch|prerelease
    .pipe(gulp.dest('./'));
});

// generates the CHANGELOG.md file based on commit
// from git commit messages
gulp.task('changelog', function () {
  var pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

  return gulp.src(paths.doc + '/CHANGELOG.md', {
      buffer: false
    })
    .pipe(changelog({
      preset: 'angular',
      repository: pkg.repository.url,
      version: pkg.version
    }))
    .pipe(gulp.dest(paths.doc + '/'));
});

// calls the listed sequence of tasks in order
gulp.task('prepare-release', function (callback) {
  return runSequence(
    'build',
    'lint',
    'bump-version',
    'changelog',
    callback
  );
});
