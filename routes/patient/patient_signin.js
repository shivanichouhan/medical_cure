var express = require('express');
var router = express.Router();
const{ patient_signup,
       patient_Login, 
       facebook_Login,
       forget_otpSend,
       forget_otpVerify,
       passwordupdate,
       reg_otpSend,
       reg_otpVerify,
       reg_patient,
       edit_patient,
       other_patient,
       rating  } = require("../../controller/patient/patient_signin")
const upload = require("../../handler/multer")       

router.post("/patient/signup_patient",patient_signup)
router.post("/patient/login_patient",patient_Login)
router.post("/patient/login_facebook",facebook_Login)

router.post("/patient/forget_password_send_otp",forget_otpSend)
router.post("/patient/forget_password_verify_otp",forget_otpVerify)
router.put("/patient/update_password",passwordupdate)

router.post("/patient/register_otp_send",reg_otpSend)
router.post("/patient/register_otp_verify",reg_otpVerify)
router.post("/patient/registration",reg_patient)

router.put("/patient/edit_profile",upload.single('patient_img'),edit_patient)
router.get("/patient/list_other_patient/:patient_id",other_patient)

router.post("/patient/rating",rating)



module.exports = router;