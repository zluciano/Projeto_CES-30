const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const oracledb = require('oracledb');

let app = express()
  .use(cors())
  .use(bodyParser.json())
  .use(
    bodyParser.urlencoded({
      extended: true,
    })
  );

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

app.get('/sql', (req, res) => {
  const query = req.body;
  const queryTest = "SELECT department_id, department_name "
  + "FROM departments "
  + "WHERE department_id < 70 "
  + "ORDER BY department_id"
  
  oracledb.getConnection({
    user          : "hr",
    password      : "welcome",
    connectString : "localhost/XE"
  },

  function(err, connection) {
    if (err) { console.error(err); return; }
    connection.execute(queryTest,
      function(err, result) {
        if (err) { console.error(err); return; }
        console.log(result.rows);
        const response = result.rows;
        res.status(200).send(response);
      });
  });
});

app.listen(3001, () => {
  console.log('Example app listening on port 3001!');
});