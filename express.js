const express = require('express');
const app = express();

const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (request, response) => {
  response.render('index', { headers: request.headers });
});

app.get('/about', (request, response) => {
  response.render('about');
});

app.use((request, response) => {
  response.status(404).send('Not Found\n');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
