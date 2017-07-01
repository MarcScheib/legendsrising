exports.config = {
  directConnect: true,
  capabilities: {
    'browserName': 'chrome'
  },

  specs: ['test/e2e/dist/**/*.js'],

  plugins: [{
    package: 'aurelia-protractor-plugin'
  }],

  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  }
};
