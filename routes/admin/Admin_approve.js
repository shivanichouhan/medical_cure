var express = require('express')
var router = express.Router()

const { AdminApprove } = require('../../controller/admin/admin_approve')
router.put('/Approve_user/:id', AdminApprove)
module.exports = router