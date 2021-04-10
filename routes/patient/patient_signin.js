var express = require('express');
var router = express.Router();
const{ patient_signup, patient_Login, facebook_Login,forget_otpSend,forget_otpVerify,passwordupdate,reg_otpSend,reg_otpVerify,reg_patient} = require("../../controller/patient/patient_signin")

router.post("/patient/signup_patient",patient_signup)
router.post("/patient/login_patient",patient_Login)
router.post("/patient/login_facebook",facebook_Login)
router.post("/patient/forget_password_send_otp",forget_otpSend)
router.post("/patient/forget_password_verify_otp",forget_otpVerify)

router.post("/patient/register_otp_send",reg_otpSend)
router.post("/patient/register_otp_verify",reg_otpVerify)
router.post("/patient/registration",reg_patient)

router.put("/patient/update_password",passwordupdate)

module.exports = router;