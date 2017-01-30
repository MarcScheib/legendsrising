var path = require('path');
var jsonServer = require('json-server');
var server;

module.exports = {
  start: function (done) {
    var app = jsonServer.create();
    var router = jsonServer.router(path.join(__dirname, '../../test/api/dev.json'));
    var middlewares = jsonServer.defaults();

    router.render = function (req, res) {
      if (Array.isArray(res.locals.data)) {
        res.jsonp({
          data: res.locals.data
        })
      } else {
        res.jsonp(res.locals.data)
      }
    };

    app.use(middlewares);
    app.use(router);
    server = app.listen(3000, function () {
      console.log('JSON Server is running on localhost:3000');
      done();
    });
  },

  stop: function (cb) {
    server.close(function () {
      console.log('JSON Server stopped');
      cb();
    });
  }
};
