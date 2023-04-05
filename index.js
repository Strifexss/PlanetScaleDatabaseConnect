const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors(
    {
        origin: "*"
    }
));
//asd
app.use(express.json())

require('dotenv').config()
const mysql = require('mysql2')
const connection = mysql.createConnection(process.env.DATABASE_URL)
console.log('Connected to PlanetScale!')


app.get("/teste", (req, res) => {
    res.send("funciona")
})

app.post("/registrar", (req, res) => {
    const email = req.body.email
    const nome = req.body.nome
    const senha = req.body.senha

    connection.query(`Insert into login (email, nome, senha) values ("${email}", "${nome}", "${senha}");`, (err, result) => {
       
        res.send(err)
        res.send(result)
        console.log(err)
    })
})


app.post("/login", (req, res) => {
    const email = req.body.email

    connection.query(`Select * from login where email="${email}";`, (err, result) => {
        res.send(result)
        console.log(err)
        console.log(result)
    })

})

app.get("/buscarClientes", (req, res) => {
    connection.query("select * from clientes;", (err, result) => {
        res.send(result)
        console.log(result)
        console.log(err)
    })
})

app.post("/registrarClientes", (req, res) => {
    const email = req.body.email
    const peso = req.body.peso
    const nome = req.body.nome
    const altura = req.body.altura
    const telefone = req.body.telefone
    const objetivo = req.body.objetivo

    connection.query(`insert into clientes (nome, email, telefone, peso, altura, objetivo) values ("${nome}", "${email}", "${telefone}", "${peso}", "${altura}", "${objetivo}");`, (err, result) => {
        res.send(result)
        console.log(result)
        console.log(err)
    })
})

app.listen(3001, () => {
    console.log("Servidor Inciado")
})