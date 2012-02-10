var http = require('http');
var url = require('url');

var router_line = require('router-line');
var cookie_line = require('cookie-line');

var router = new router_line.Router;

router.add('/', function (req, res) {
  res.end('hello');
});

router.add('/:user_name', function (req, res) {
  res.end('hello, ' + this.params['user_name'] + '!');
});

var Helper = (function () {
  function Helper () {

  }

  return Helper;
})();

http.createServer(function (req, res) {
  var parsedUrl = url.parse(req.url);
  var route = router.route(parsedUrl.path);
  if (route !== undefined) {
    var helper = new Helper;
    helper.params = route.params;
    route.value.call(helper, req, res);
  } else {
    res.writeHeader(404);
    res.end('404 Not Found');
  }
}).listen(8124);