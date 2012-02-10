var http = require('http');
var url = require('url');

var router_line = require('router-line');
var cookie_line = require('cookie-line');

var router = new router_line.Router;

router.add('/', function (req, res) {
  if (this.cookies.get('user_name')) {
    res.end('hello, ' + this.cookies.get('user_name') + '!');
  } else {
    res.end('hello');
  }
});

router.add('/login/:user_name', function (req, res) {
  this.cookies.set('user_name', this.params['user_name'], {domain: '.local.koba789.com', path: '/'});
  res.end('logined');
});

var Helper = (function () {
  function Helper () {
    
  }

  Helper.prototype.before = function (req, res) {
    this.cookies = cookie_line(req, res);
  };

  return Helper;
})();

http.createServer(function (req, res) {
  var parsedUrl = url.parse(req.url);
  var route = router.route(parsedUrl.path);
  if (route !== undefined) {
    var helper = new Helper;
    helper.before(req, res);
    helper.params = route.params;
    route.value.call(helper, req, res);
  } else {
    res.writeHeader(404);
    res.end('404 Not Found');
  }
}).listen(8124);