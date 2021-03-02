var express = require('express');
var router = express.Router();
const{ doctor_reg,doctorLogin } = require("../../controller/doctor/doctor_registration")
// const upload = require("../handler/multer")

router.post("/doctor/login_doctor",doctorLogin)
router.post("/doctor/signup_doctor",doctor_reg)

module.exports = router;