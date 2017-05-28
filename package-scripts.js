const {series, crossEnv, concurrent, rimraf} = require('nps-utils');

const srcDir = 'src';
const destDir = 'dist';
const sassSrcDir = 'scss';
const sassDestDir = 'dist';
const docsDir = 'docs';

module.exports = {
  scripts: {
    default: 'nps',
    test: {
      default: 'nps test.karma',
      api: 'json-server --watch ./test/api/dev.json',
      karma: 'gulp test',
      lint: {
        default: 'nps test.lint.js',
        js: `eslint ${srcDir}`,
        sass: `sass-lint ${sassSrcDir}/**/*.scss --verbose --no-exist`
      },
      cover: 'gulp cover',
      coveralls: 'cat build/reports/coverage/lcov/lcov.info | coveralls'
    },
    e2e: {
      default: 'nps e2e.protractor',
      protractor: 'gulp serve e2e'
    },
    build: {
      default: series(
        rimraf(`rimraf ${destDir}`),
        concurrent({
          jsbuild: 'nps build.js',
          htmlbuild: 'nps build.html',
          sassbuild: 'nps build.sass'
        })
      ),
      js: 'gulp build-system',
      html: 'gulp build-html',
      sass: 'gulp build-scss'
    },
    prerelease: series(
      concurrent({
        jslint: 'nps test.lint.js',
        sasslint: 'nps test.lint.sass'
      }),
      'nps test',
      'nps build'
    ),
    changelog: `conventional-changelog -p angular -i ${docsDir}/CHANGELOG.md -s`,
    serve: `browser-sync start --server . --files style`
  }
};
