var express = require('express')
var router = express.Router()

const { Blockworker } = require('../controller/BlockWorker')
router.put('/block_worker/:id',Blockworker)
module.exports = router