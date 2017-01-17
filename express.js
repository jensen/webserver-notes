var express = require('express');
var app = express();

var port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', function(request, response) {
  response.render('index', { headers: request.headers });
});

app.get('/about', function(request, response) {
  response.render('about', {

  });
});

app.use(function(request, response) {
  response.status(404).send('Not Found\n');
})

app.listen(port, function() {
  console.log('Example app listening on port 3000!');
});
