const express = require('express')
const app = express()

const porta = 3004

const db = require('./data/db')

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.get('/clientes', async ( req, res ) => {
   await db('clientes')
    .then((clientes) => res.json(clientes))
    .catch((err) => res.status(500).send(err))
})
app.get('/clientes/:id', async ( req, res ) => {
   await db('clientes')
    .where({id: req.params.id})
    .first()
    .then((clientes) => res.json(clientes))
    .catch((err) => res.status(500).send(err))
})
app.post('/clientes', async ( req, res ) => {
    const cliente = { ...req.body }
    await db('clientes')
    .insert(cliente)
    .then((_) => res.status(204).send())
    .catch((err) => res.status(500).send(err))
})
app.put('/clientes/:id', async ( req, res ) => {
    const cliente = { ...req.body }
   await db('clientes')
    .update(cliente)
    .where({id: req.params.id})
    .then((_) => res.status(204).send())
    .catch((err) => res.status(500).send(err))
})
app.delete('/clientes/:id', async ( req, res ) => {
   await db('clientes')
    .where({id: req.params.id})
    .del()
    .then((_) => res.status(204).send())
    .catch((err) => res.status(500).send(err))
})

app.listen(porta, () => {
    console.log(`Servidor esta executando na porta ${porta}`)
})