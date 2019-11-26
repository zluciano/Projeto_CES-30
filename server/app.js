const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const oracledb = require('oracledb')

let _connection = null

const getConnection = async () => {
  try {
    if (_connection === null) {
      _connection = await oracledb.getConnection({
        user: 'IsabelleO',
        password: 'IsabelleO',
        connectString: '(DESCRIPTION =(ADDRESS = (PROTOCOL = TCP)(HOST = 161.24.2.244)(PORT = 1521))(CONNECT_DATA =(SID= ORCL)))'
      })
      console.log('Connection opened\n')
    } else {
      console.log('Connection already opened\n')
    }
  } catch (err) {
    _connection = null
    console.log("Error: ", err)
  }
  return _connection
}

const closeConnection = async () => {
  try {
    await _connection.close()
    console.log(`connection closed\n`)
  } catch (err) {
    console.log("Error when closing the database connection: ", err)
  }
}

const executeQuery = async (query, params = {}) => {
  try {
    const connection = await getConnection()
    return await connection.execute(query, params)
  } catch (err) {
    console.log("Error: ", err)
    return null
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

// http://localhost:3001/
app.get('/', (req, res) => {
  res.status(200).send('API Online')
})

// http://localhost:3001/escolas/rio de janeiro
app.get('/escolas/:cidade', async (req, res) => {
  const response = await executeQuery(`
    SELECT ESCOLA.NOME_ESCOLA
    FROM ESCOLA
    JOIN MUNICIPIO ON MUNICIPIO.MUN_ID = ESCOLA.MUN_ID
    WHERE LOWER(MUNICIPIO.NOME) = LOWER(:cidade)
    ORDER BY ESCOLA.NOME_ESCOLA
  `, req.params)
  res.status(200).send(response)
})

// http://localhost:3001/escola/COLEGIO CLASSE A
app.get('/escola/:escola', async (req, res) => {
  const response = await executeQuery(`
    SELECT MUNICIPIO.UF, MUNICIPIO.NOME
    FROM MUNICIPIO
    INNER JOIN ESCOLA ON MUNICIPIO.MUN_ID = ESCOLA.MUN_ID
    WHERE LOWER(ESCOLA.NOME_ESCOLA) = LOWER(:escola) AND ROWNUM = 1
  `, req.params)
  res.status(200).send(response)
})

// http://localhost:3001/enem/ano/2015
app.get('/enem/ano/:ano', async (req, res) => {
  const response = await executeQuery(`
    SELECT ESCOLA.NOME_ESCOLA, ((ENEM_ESCOLA.NU_MEDIA_CN + ENEM_ESCOLA.NU_MEDIA_CH +
      ENEM_ESCOLA.NU_MEDIA_LP + ENEM_ESCOLA.NU_MEDIA_MT + ENEM_ESCOLA.NU_MEDIA_REDACAO)/5) "Media"
    FROM ENEM_ESCOLA
    JOIN ESCOLA ON ENEM_ESCOLA.NOME_ESCOLA = ESCOLA.NOME_ESCOLA
    WHERE ENEM_ESCOLA.ENEM_ID = :ano
    ORDER BY "Media" DESC
  `, req.params)
  res.status(200).send(response)
})

// http://localhost:3001/enem/escola/COLEGIO CLASSE A
app.get('/enem/escola/:escola', async (req, res) => {
  const response = await executeQuery(`
    SELECT ENEM_ESCOLA.ENEM_ID "Ano", ENEM_ESCOLA.NU_PARTICIPANTES, 
        ENEM_ESCOLA.NU_PARTICIPANTES_ESPEC, ((ENEM_ESCOLA.NU_MEDIA_CN + ENEM_ESCOLA.NU_MEDIA_CH +
        ENEM_ESCOLA.NU_MEDIA_LP + ENEM_ESCOLA.NU_MEDIA_MT + ENEM_ESCOLA.NU_MEDIA_REDACAO)/5) "Media",
        ENEM_ESCOLA.NU_MEDIA_CN, ENEM_ESCOLA.NU_MEDIA_CH, 
        ENEM_ESCOLA.NU_MEDIA_LP, ENEM_ESCOLA.NU_MEDIA_MT, ENEM_ESCOLA.NU_MEDIA_REDACAO
    FROM ENEM_ESCOLA
    JOIN ESCOLA ON ENEM_ESCOLA.NOME_ESCOLA = ESCOLA.NOME_ESCOLA
    WHERE ESCOLA.NOME_ESCOLA = :escola
    ORDER BY ENEM_ESCOLA.ENEM_ID
  `, req.params)
  res.status(200).send(response)
})

// http://localhost:3001/enem/estatisticas
app.get('/enem/estatisticas', async (req, res) => {
  const response = await executeQuery(`
    SELECT ENEM_ESCOLA.NU_PARTICIPANTES, ((ENEM_ESCOLA.NU_MEDIA_CN + ENEM_ESCOLA.NU_MEDIA_CH +
      ENEM_ESCOLA.NU_MEDIA_LP + ENEM_ESCOLA.NU_MEDIA_MT + ENEM_ESCOLA.NU_MEDIA_REDACAO)/5) "Media"
    FROM ENEM_ESCOLA
    JOIN ESCOLA
      ON ENEM_ESCOLA.NOME_ESCOLA = ESCOLA.NOME_ESCOLA
    WHERE ENEM_ESCOLA.ENEM_ID > 2010
    ORDER BY "Media" DESC
  `, req.params)
  res.status(200).send(response)
})

app.listen(3001, async () => {
  console.log('Example app listening on port 3001!')
})

process.on('SIGINT', async () => {
  await closeConnection()
  process.exit()
})