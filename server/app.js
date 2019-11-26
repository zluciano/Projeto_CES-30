const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const oracledb = require('oracledb');

let _connection = null;

const getConnection = async () => {
  try{
    if(_connection === null) {
      _connection = await oracledb.getConnection({
        user: 'IsabelleO',
        password: 'IsabelleO',
        connectString: '(DESCRIPTION =(ADDRESS = (PROTOCOL = TCP)(HOST = 161.24.2.244)(PORT = 1521))(CONNECT_DATA =(SID= ORCL)))'
      })
      console.log('Connection opened =)')
    } else {
      console.log('Connection unopened =(')
    }
  } catch (err) {
    console.log("Error: ", err)
  }
  return _connection
}

const closeConnection = async () => {
  try {
    await _connection.close();
    console.log(`connection closed\n`)
  } catch (err) {
    console.log("Error when closing the database connection: ", err)
  }
}

const executeQuery = async (query) => {
  try {
    const connection = await getConnection();
    return await connection.execute(query).then(res => res.rows);
  } catch(err) {
    console.log("Error: ", err)
    return null;
  }
}

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
  res.status(200).send(response)
})

app.get('/sql', async (req, res) => {
  const query = req.body;
  const teste = await executeQuery(`
    SELECT * FROM MUNICIPIO
  `)
  res.status(200).send(teste)
});

app.listen(3001, async () => {
  console.log('Example app listening on port 3001!')
})

process.on('SIGINT', async () => {
  await closeConnection();
  process.exit()
})