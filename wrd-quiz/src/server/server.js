const path = require('path');
const express = require('express');
const compression = require('compression');

const port = 50004;
const distFolder = '../../dist';

const app = express();

app.use(compression());
app.use(express.static(path.join(__dirname, distFolder)));

app.get('/assets/quiz/*', function(req, res) {
  res.redirect(req.url.replace('/assets/quiz/', '/'));
});

app.listen(port);

console.log(`Listening on port ${port}...`);
