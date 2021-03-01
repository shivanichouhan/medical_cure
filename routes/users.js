var express = require('express');
var router = express.Router();
const upload = require("../handler/multer")
const{ normal_signup,normal_signin,otp_send,otp_verify,clinic_reg,clinic_info,gmail_signin,edit_profile }=require('../controller/users');

router.get("/clinic_information/:userId",clinic_info)
router.post("/signin_user",normal_signin)
router.post("/register_user",normal_signup)
router.post("/login_from_gmail",gmail_signin)
router.put("/clinic_registration/:userId",upload.fields([{name:'certificate'},{name:'clinic'}]),clinic_reg)
router.put("/edit_profile_user/:userId/:imgID",upload.fields([{name:'clinic'},{name:'certificate'}]),edit_profile)
router.post("/user/send_otp",otp_send)
router.post("/user/verify_otp",otp_verify)

module.exports = router;
