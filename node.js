var http = require('http');

var hostname = '127.0.0.1';
var port = 3000;

var paths = {
  '/': function(request, response) {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/plain');
    response.end('Index\n');
  },
  '/about': function(request, response) {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/plain');
    response.end('About\n');
  }
}

var errors = {
  '404': function(request, response) {
    response.statusCode = 404;
    response.setHeader('Content-Type', 'text/plain');
    response.end('Not Found\n');
  }
}

var server = http.createServer(function(request, response) {
  var path = request.url;
  if(paths.hasOwnProperty(path)) {
    paths[path](request, response);
  } else {
    errors['404'](request, response);
  }
});

server.listen(port, hostname, function() {
  console.log('Server running at http://' + hostname + ':' + port + '/');
});
