var express = require('express');
var app = express();

app.get('/', function (req, res) {
  let objeto = {
    a: 2
  };
  res.send(objeto);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});