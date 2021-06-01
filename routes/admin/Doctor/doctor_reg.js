var express = require('express');
var router = express.Router();
const{ reg_doctor,list_doctor,pagination_list_doctor,doctorByName,remove_doctor,status_manage,doc_signup,docInfod,edit_doctor } = require("../../../controller/admin/Doctor/doctor_reg")
const{ isAdmin,checkLogin } = require("../../../auth")
const upload = require("../../../handler/multer")

router.get("/doctor_list",list_doctor)
router.post("/doctor_with_pagination",pagination_list_doctor)
router.post("/admin_doctor_signup",doc_signup)
router.get("/admin_doctor_info_by_id/:docId",docInfod)
router.post("/admin/doctor_registration",upload.fields([{name:'certificate_Img'},{name:'License_img_front_side'},{name:'License_img_back_side'},{name:'identity_front_side_img'},{name:'identity_back_side_img'}]),reg_doctor)
router.put("/admin/doctor_edit_profile/:doctorId",upload.fields([{name:'certificate_Img'},{name:'License_img_front_side'},{name:'License_img_back_side'},{name:'identity_front_side_img'},{name:'identity_back_side_img'}]),edit_doctor)
router.delete("/admin/doctor_remove/:adminId",remove_doctor)
router.put("/admin/doctor_manage_status",status_manage)
router.post("/admin/doctor_by_search",doctorByName)

// http://18.220.239.106
module.exports = router;

