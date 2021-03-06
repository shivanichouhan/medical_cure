var express = require('express');
var router = express.Router();
const{ doctor_info,ongoindConsultApi
    ,doctorOnline_status,doctor_reg,doctorLogin,log_social,otpSend,otpVerify,passupdate,reg_from,edit_profile_pic } = require("../../controller/Doctor/doctor_signin")
const upload = require("../../handler/multer")

router.get("/doctor/doctor_info/:docId",doctor_info)
router.post("/doctor/online_status",doctorOnline_status)
router.post("/doctor/social_login",log_social)
router.post("/doctor/login_doctor",doctorLogin)
router.post("/doctor/signup_doctor",doctor_reg)
router.post("/doctor/registration_doctor/:docId",upload.fields([{name:'certificate_Img'},{name:'License_img_front_side'},{name:'License_img_back_side'},{name:'passing_year_certificate'},{name:'identity_front_side_img'},{name:'identity_back_side_img'}]),reg_from)
router.post("/doctor/send_otp",otpSend)// for password forget
router.post("/doctor/verify_otp",otpVerify)// for password forget verfiy
router.put("/doctor/update_password",passupdate)
router.put("/doctor/edit_profile_pic",upload.single('profile_pic'),edit_profile_pic)
router.post("/doctor/ongoindConsultApi",ongoindConsultApi)

module.exports = router;