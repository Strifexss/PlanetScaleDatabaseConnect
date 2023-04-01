const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())

require('dotenv').config()
const mysql = require('mysql2')
const connection = mysql.createConnection(process.env.DATABASE_URL)
console.log('Connected to PlanetScale!')

app.get("/pesquisar", (req, res) => {
    connection.query("Select * from pessoas;", (err, result) => {
        res.send(result)
        console.log(err)
    })
})

app.post("/postar", (req, res) => {
    connection.query("Insert into pessoas (pessoas_id, nome) values (3, 'Giovanny');", (err, result) => {
        res.send(result)
        console.log(err)
    })
})

app.listen(3001, () => {
    console.log("Servidor Inciado")
})