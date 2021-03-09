var express = require('express')
var router = express.Router()

const { Blockworker } = require('../../controller/helth_worker/BlockWorker')
router.put('/block_worker/:id',Blockworker)
module.exports = router
//bhjhjghujhghghg