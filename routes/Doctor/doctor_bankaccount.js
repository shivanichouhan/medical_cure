var express = require('express');
var router = express.Router();
const{ doctor_bank} = require("../../controller/Doctor/doctor_bankaccount")
router.post("/doctor_bankAccount/:user_id",doctor_bank)

module.exports = router;