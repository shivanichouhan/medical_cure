var express = require('express')
var router = express.Router()
const { sendEmail,doctor_mirta_suscribe,doctor_suscribe } = require('../../controller/admin/suscribe')

router.post("/admin/suscribe_now",sendEmail)//suscribe in home page
router.post("/admin/suscribe_now_doctor_mitra",doctor_mirta_suscribe)
router.post("/admin/suscribe_now_doctor",doctor_suscribe)

module.exports = router
