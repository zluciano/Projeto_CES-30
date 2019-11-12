var express = require('express');
var app = express();

app.get('/', (req, res) => {
  let response = {
    values: [
      { x:1, y: 2 },
      { x:2, y: 10 },
      { x:3, y: 5 },
      { x:4, y: 6 },
      { x:5, y: 7 },
      { x:6, y: 11 },
      { x:7, y: 9 },
      { x:8, y: 1 },
    ]
  };
  res.status(200).send(response);
});

app.listen(3001, function () {
  console.log('Example app listening on port 3001!');
});