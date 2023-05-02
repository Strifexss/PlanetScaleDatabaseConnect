const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors());
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



app.post("/buscarClientes", (req, res) => {
    const id_usuario = req.body.id_usuario
    connection.query(`select * from clientes left join planos on clientes.planos_id = planos.id where id_login = ${id_usuario};`, (err, result) => {
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
    const id_usuario = req.body.id_usuario
    connection.query(`insert into clientes (nome, email, telefone, peso, altura, objetivo, planos_id, id_login) values ("${nome}", "${email}", "${telefone}", "${peso}", "${altura}", "${objetivo}", ${planosId}, ${id_usuario});`, (err, result) => {
        res.send(result)
        console.log(result)
        console.log(err)
    })
})

app.post("/buscarAulas", (req, res) => {
    const id_usuario = req.body.id_usuario
    connection.query(`select * from aulas where id_usuario = ${id_usuario};`, (err, result) => {
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
    const id_usuario = req.body.id_usuario
    connection.query(`insert into aulas (nome, descricao, nivel, duracao, id_usuario) values ("${nome}", "${descricao}", "${nivel}", "${duracao}", ${id_usuario});`, (err, result) => {
        res.send(result)
        console.log(err)
        console.log(result)
    })
})

app.post("/deletarAulas", (req, res) => {
    const id_aula = req.body.id_aula
    const id_usuario = req.body.id_usuario

    connection.query(`delete from aulas where id = ${id_aula} and id_usuario = ${id_usuario};`, (err, result) => {
        console.log(err)
        console.log(result)
        res.send(result)
    })

})

app.post("/buscarPlanos", (req, res) => {
    const id_usuario = req.body.id_usuario
    connection.query(`select * from planos where id_usuario=${id_usuario};`, (err, result) => {
        console.log(result)
        console.log(err)
        res.send(result)
    })
})

app.post("/adicionarPlanos", (req, res) => {
    const nome = req.body.nome
    const descricao = req.body.descricao
    const preco = req.body.preco
    const dias = req.body.dias
    const id_usuario = req.body.id_usuario

    connection.query(`insert into planos (nomePlanos, descricao, preco, duracao_dias, data_criacao, id_usuario) values ("${nome}", "${descricao}", ${preco}, ${dias}, now(), ${id_usuario});`, (err, result) => {
        console.log(err)
        console.log(result)
        res.send(result)
    })
})

app.post("/deletarPlanos", (req, res) => {
    const id = req.body.id

    connection.query(`delete from planos where id=${id}`, (err, result) => {
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

app.post("/buscarProfessores", (req, res) => {
    const id_usuario = req.body.id_usuario
    connection.query(`select * from funcionarios where id_usuario = ${id_usuario}; `, (err, result) => {
        console.log(result)
        console.log(err)
        res.send(result)
    })
})

app.post("/registrarProfessores", (req, res) => {
    const email = req.body.email
    const nome = req.body.nome
    const telefone = req.body.telefone
    const salario = req.body.salario
    const id_usuario = req.body.id_usuario
    connection.query(`insert into funcionarios (nome, email, telefone, salario, data_contratacao, id_usuario) values ("${nome}", "${email}", "${telefone}", ${salario}, now(), ${id_usuario});`, (err, result) => {
        res.send(result)
        console.log(result)
        console.log(err)
    })
})

app.post("/deletarProfessores", (req, res) => {
    const id = req.body.id

    connection.query(`delete from funcionarios where id=${id};`, (err, result) => {
        console.log(err)
        console.log(result)
        res.send(result)
    })
})

app.post("/adicionarSemana", (req, res) => {
    const professor = req.body.professor
    const aula = req.body.aula
    const fim = req.body.fim
    const dia = req.body.dia
    const inicio = req.body.inicio
    const id_usuario = req.body.id_usuario
    connection.query(`insert into aulas_dia_semana (dia_semana, hora_inicio, hora_fim, id_funcionario, id_aula, id_usuario) values ("${dia}", ${inicio}, ${fim}, ${professor}, ${aula}, ${id_usuario})`, (err, result) => {
        res.send(result)
        console.log(result)
        console.log(err)
    })
})


app.post("/buscarAulasSemanais", (req, res) => {
    const id_usuario = req.body.id_usuario
    connection.query(`select * from aulas_dia_semana inner join funcionarios on aulas_dia_semana.id_funcionario = funcionarios.id inner join aulas on aulas_dia_semana.id_aula = aulas.id where aulas_dia_semana.id_usuario=${id_usuario};`, (err, result) => {
        console.log(result)
        console.log(err)
        res.send(result)
    })
})

app.post("/deletarCalendario", (req, res) => {
  const id = req.body.id

    connection.query(`DELETE FROM aulas_dia_semana WHERE id_dia_semana=${id};`, (err, result) => {
        console.log(err)
        console.log(result)
        res.send(result)
    })
})

app.post("/buscarCompromissos", (req, res) => {
    const id = req.body.id

    connection.query(`select * from compromissos where id_usuario = ${id};`, (err, result) => {
        console.log(err)
        console.log(result)
        res.send(result)
    })
})

app.post("/adicionarCompromissos", (req, res) => {
    const nome = req.body.nome
    const descricao = req.body.descricao
    const id_usuario = req.body.id_usuario
    
    connection.query(`insert into compromissos (nome, descricao, id_usuario) values ("${nome}", "${descricao}", ${id_usuario});`, (err, result) => {
        console.log(err)
        console.log(result)
        res.send(result)
    })
})

app.post("/deletarCompromissos", (req, res) => {
    const id = req.body.id

    connection.query(`delete from compromissos where id = ${id};`, (err, result) => {
        console.log(result)
        console.log(err)
        res.send(result)
    })
})



app.listen(3001, () => {
    console.log("Servidor Inciado")
})