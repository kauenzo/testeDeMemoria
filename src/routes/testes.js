const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://yupaulo7:b6qMX2fPx2InES5Z@cluster0.g7ki6nh.mongodb.net/trabalho?retryWrites=true&w=majority')

const testeSchema = new mongoose.Schema({
    titulo: String,
    perguntas: Array
})

const Teste = mongoose.model('Teste', testeSchema)

router.get('/', async (req, res) => {
    const testes = await Teste.find({})
    res.json(testes)
})

router.get('/:titulo', async (req, res) => {
    console.log(req.params.titulo)
    const teste = await Teste.findOne({titulo: req.params.titulo}).exec()
    res.json(teste)
})

router.post('/', async (req, res) => {
    const teste = new Teste({
        titulo: req.body.titulo,
        perguntas: []
    })
    teste.save()
    res.send(req.body).status(200)
})

router.post('/:titulo', async (req, res) => {
    let teste = await Teste.findOne({titulo: req.params.titulo}).exec()
    if(!teste) {
        res.send(`O TESTE ${req.params.titulo} NÃO EXISTE`).status(404)
        return
    }
    const perguntas = teste.perguntas
    perguntas.push(req.body)
    teste = await Teste.findOneAndUpdate({titulo: req.params.titulo}, {perguntas: perguntas})
    res.send(req.body).status(200)
})

router.delete('/:titulo', async (req, res) => {
    try {
        await Teste.findOneAndDelete({titulo: req.params.titulo}).exec()
        res.send(req.params.titulo).status(200)
    } catch(err) {
        console.log(err)
        res.send('ERRO').status(500)
    }
})

router.put('/:titulo', async (req, res) => {
    await Teste.findOneAndUpdate({titulo: req.params.titulo}, {titulo: req.body.titulo})
    res.send(req.body.titulo).status(200)
})

//router.delete('/:titulo/:pergunta')
//router.put('/:titulo/:pergunta')

module.exports = router