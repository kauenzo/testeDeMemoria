const express = require('express')
const router = express.Router()
const testes = require('./testes')
const resultados = require('./resultados')

router.use(express.json())
router.use('/testes', testes)
router.use('/resultados', resultados)

module.exports = router
