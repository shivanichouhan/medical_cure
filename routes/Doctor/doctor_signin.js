var express = require('express');
var router = express.Router();
const{ doctor_reg,doctorLogin,log_social } = require("../../controller/Doctor/doctor_signin")
// const upload = require("../handler/multer")

router.post("/doctor/social_login",log_social)
router.post("/doctor/login_doctor",doctorLogin)
router.post("/doctor/signup_doctor",doctor_reg)

module.exports = router;