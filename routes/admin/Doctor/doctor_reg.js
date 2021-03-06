var express = require('express');
var router = express.Router();
const{ reg_doctor,list_doctor,remove_doctor } = require("../../../controller/admin/Doctor/doctor_reg")
const{ isAdmin } = require("../../../auth")
const upload = require("../../../handler/multer")

router.get("/admin/doctor_list/:adminId",isAdmin,list_doctor)
router.post("/admin/doctor_registration/:adminId",isAdmin,upload.fields([{name:'certificate_Img'},{name:'License_img_front_side'},{name:'License_img_back_side'},{name:'passing_year_certificate'},{name:'identity_front_side_img'},{name:'identity_back_side_img'}]),reg_doctor)
// router.put("/admin/doctor_edit_profile/:adminId/:doctorId",isAdmin,edit_doctor)
router.delete("/admin/doctor_remove/:adminId/:doctorId",isAdmin,remove_doctor)

module.exports = router;

