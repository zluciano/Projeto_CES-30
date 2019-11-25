const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const oracledb = require('oracledb');

let connection;

(async function () {
  try {
    connection = await oracledb.getConnection({
      user: 'YOUR_DATABASE_USER',
      password: 'YOUR_DATABASE_PASSWORD',
      connectString: 'localhost/yourorclpdb'
    });
    console.log("Successfully connected to Oracle!")
  } catch (err) {
    console.log("Error: ", err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.log("Error when closing the database connection: ", err);
      }
    }
  }
})()

let app = express()
  .use(cors())
  .use(bodyParser.json())
  .use(
    bodyParser.urlencoded({
      extended: true,
    })
  )

app.get('/', (req, res) => {
  let response = {
    values: [
      { x: 1, y: 2 },
      { x: 2, y: 10 },
      { x: 3, y: 5 },
      { x: 4, y: 6 },
      { x: 5, y: 7 },
      { x: 6, y: 11 },
      { x: 7, y: 9 },
      { x: 8, y: 1 },
    ]
  }
  res.status(200).send(response);
})

app.listen(3001, () => {
  console.log('Example app listening on port 3001!');
})