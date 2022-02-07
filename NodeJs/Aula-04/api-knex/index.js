const express = require('express')
const app = express()

const porta = 3003

const db = require('./data/db')

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.get('/tasks', (req, res) => {
    db('tasks')
    .then((tasks) => res.json(tasks))
    .catch((err) => res.status(500).send(err))
})

app.get('/tasks/:id', (req, res) => {
    db('tasks')
    .where({id: req.params.id})
    .first()
    .then((tasks) => res.json(tasks))
    .catch((err) => res.status(500).send(err))
})
app.post('/tasks', (req, res) => {
    const task = { ...req.body }
    db('tasks')
    .insert(task)
    .then((_) => res.status(204).send())
    .catch((err) => res.status(500).send(err))
})
app.put('/tasks/:id', (req, res) => {
    const task = { ...req.body }
    db('tasks')
    .update(task)
    .where({id: req.params.id})
    .then((_) => res.status(204).send())
    .catch((err) => res.status(500).send(err))
})
app.delete('/tasks/:id', (req, res) => {
    db('tasks')
    .where({id: req.params.id})
    .del()
    .then((_) => res.status(204).send())
    .catch((err) => res.status(500).send(err))
})


app.listen(porta, () => {
    console.log(`Servidor esta executando na porta ${porta}`)
})