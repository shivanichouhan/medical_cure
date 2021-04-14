var express = require('express')
var router = express.Router()
const { sendEmail } = require('../../controller/admin/suscribe')

router.post("/admin/suscribe_now",sendEmail)

module.exports = router
