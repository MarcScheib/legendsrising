var path = require('path');
var jsonServer = require('json-server');
var server;

module.exports = {
  start: function(done) {
    server = jsonServer.create();
    var router = jsonServer.router(path.join(__dirname, '../../test/api/dev.json'));
    var middlewares = jsonServer.defaults();

    server.use(middlewares);
    server.use(router);
    server.listen(3000, function() {
      console.log('JSON Server is running');
      done();
    });
  },

  stop: function(cb) {
    server.close(function() {
      console.log('JSON Server stopped');
      cb();
    });
  }
};
