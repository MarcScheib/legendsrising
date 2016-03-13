exports.config = {
  directConnect: true,
  capabilities: {
    'browserName': 'chrome'
  },

  specs: ['test/e2e/dist/**/*.js'],

  plugins: [{
    path: 'protractor.aurelia.plugin.js'
  }],

  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  }
};
