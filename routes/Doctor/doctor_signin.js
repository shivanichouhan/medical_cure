var express = require('express');
var router = express.Router();
const{ doctor_reg,doctorLogin,log_social,otpSend,otpVerify,passupdate } = require("../../controller/Doctor/doctor_signin")
// const upload = require("../handler/multer")

router.post("/doctor/social_login",log_social)
router.post("/doctor/login_doctor",doctorLogin)
router.post("/doctor/signup_doctor",doctor_reg)
router.post("/doctor/send_otp",otpSend)
router.post("/doctor/verify_otp",otpVerify)
router.put("/doctor/update_password",passupdate)

module.exports = router;