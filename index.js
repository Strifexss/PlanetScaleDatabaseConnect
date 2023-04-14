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
    connection.query("select * from clientes inner join planos on clientes.planos_id = planos.id;", (err, result) => {
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
    const planosId = req.body.planosId
    connection.query(`insert into clientes (nome, email, telefone, peso, altura, objetivo, planos_id) values ("${nome}", "${email}", "${telefone}", "${peso}", "${altura}", "${objetivo}", ${planosId});`, (err, result) => {
        res.send(result)
        console.log(result)
        console.log(err)
    })
})

app.get("/buscarAulas", (req, res) => {
    connection.query("select * from aulas", (err, result) => {
        console.log(err)
        console.log(result)
        res.send(result)
    })
})

app.post("/adicionarAulas", (req, res) => {
    const nome = req.body.nome
    const descricao = req.body.descricao
    const nivel = req.body.nivel
    const duracao = req.body.duracao

    connection.query(`insert into aulas (nome, descricao, nivel, duracao) values ("${nome}", "${descricao}", "${nivel}", "${duracao}");`, (err, result) => {
        res.send(result)
        console.log(err)
        console.log(result)
    })
})

app.get("/buscarPlanos", (req, res) => {
    connection.query("select * from planos;", (err, result) => {
        console.log(result)
        console.log(err)
        res.send(result)
    })
})

app.post("/deletarCliente", (req, res) => {
    const email = req.body.email

    connection.query(`DELETE FROM clientes WHERE email="${email}";`, (err, result) => {
        console.log(result)
        console.log(err)
        res.send(result)
    })
})

app.listen(3001, () => {
    console.log("Servidor Inciado")
})