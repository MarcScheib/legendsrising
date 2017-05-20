const {series, crossEnv, concurrent, rimraf} = require('nps-utils');

const srcDir = 'src';
const destDir = 'dist';
const sassSrcDir = 'scss';
const sassDestDir = 'dist';

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
      }
    },
    e2e: {
      default: 'nps e2e.protractor',
      protractor: 'gulp serve e2e'
    },
    clean: rimraf(`rimraf ${destDir}`),
    release: concurrent({
      jslint: 'nps test.lint.js',
      sasslint: 'nps test.lint.sass'
    })
  }
};
