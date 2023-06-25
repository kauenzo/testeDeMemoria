const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://yupaulo7:b6qMX2fPx2InES5Z@cluster0.g7ki6nh.mongodb.net/trabalho?retryWrites=true&w=majority')

const resultadoSchema = new mongoose.Schema({
    teste: String,
    qnt_resposta: Number,
    qnt_acerto: Number
})

const Resultado = mongoose.model('Resultado', resultadoSchema)

router.get('/', async (req, res) => {
    const resultados = await Resultado.find({})
    res.json(resultados)
})

router.get('/:titulo', async (req, res) => {
    const resultado = await Resultado.findOne({teste: req.params.titulo}).exec()
    res.json(resultado)
})

router.post('/', async (req, res) => {
    const result = new Resultado(req.body)
    result.save()
    res.send('OK').status(200)
})

router.post('/:titulo', async (req, res) => {
    await Resultado.findOneAndUpdate({teste: req.params.titulo}, {qnt_resposta: req.body.qnt_resposta, qnt_acerto: req.body.qnt_acerto}).exec()
    res.send('OK').status(200)
})

module.exports = router
