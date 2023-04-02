const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

require('dotenv').config()
const mysql = require('mysql2')
const connection = mysql.createConnection(process.env.DATABASE_URL)
console.log('Connected to PlanetScale!')


app.get("/teste", (req, res) => {
    res.send("funciona")
})
//TEste
app.post("/registrar", (req, res, next) => {
    const email = req.body.email
    const nome = req.body.nome
    const senha = req.body.senha

    connection.query(`Insert into login (email, nome, senha) values ("${email}", "${nome}", "${senha}");`, (err, result) => {
        res.send(err)
        res.send(result)
        console.log(err)
    })
})

app.use(express.json())

app.post("/login", (req, res) => {
    const email = req.body.email

    connection.query(`Select * from login where email="${email}";`, (err, result) => {
        res.send(result)
        console.log(err)
        console.log(result)
    })

})



app.listen(3001, () => {
    console.log("Servidor Inciado")
})