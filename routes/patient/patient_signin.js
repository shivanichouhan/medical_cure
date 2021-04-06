var express = require('express');
var router = express.Router();
const{ patient_signup, patient_Login, facebook_Login, otpSend, otpVerify,passwordupdate} = require("../../controller/patient/patient_signin")

router.post("/patient/signup_patient",patient_signup)
router.post("/patient/login_patient",patient_Login)
router.post("/patient/login_facebook",facebook_Login)
router.post("/patient/send_otp",otpSend)
router.post("/patient/verify_otp",otpVerify)
router.put("/patient/update_password",passwordupdate)

module.exports = router;