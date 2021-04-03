var express = require('express');
var router = express.Router();

const { signin,signup,otpSend,otpVerify,passwordupdate,edit_admin_profile,logout} = require('../../controller/admin/admin_login');

router.post("/admin_signup",signup)
router.post("/admin_signin",signin)
router.post("/admin/send_otp",otpSend)
router.post("/admin/verify_otp",otpVerify)
router.put("/admin/update_password",passwordupdate)
router.put("/admin/edit_admin_profile/:adminId",edit_admin_profile)
router.get("/admin_logout",logout)

module.exports = router;