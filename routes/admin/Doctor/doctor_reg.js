var express = require('express');
var router = express.Router();
const{ reg_doctor,list_doctor,remove_doctor,status_manage,doc_signup } = require("../../../controller/admin/Doctor/doctor_reg")
const{ isAdmin,checkLogin } = require("../../../auth")
const upload = require("../../../handler/multer")

router.get("/doctor_list",list_doctor)
router.post("/admin_doctor_signup",doc_signup)
router.post("/admin/doctor_registration",upload.fields([{name:'certificate_Img'},{name:'License_img_front_side'},{name:'License_img_back_side'},{name:'identity_front_side_img'},{name:'identity_back_side_img'}]),reg_doctor)
//router.put("/admin/doctor_edit_profile/:adminId/:doctorId",isAdmin,edit_doctor)
router.delete("/admin/doctor_remove/:adminId",remove_doctor)
router.put("/admin/doctor_manage_status",status_manage)

module.exports = router;

