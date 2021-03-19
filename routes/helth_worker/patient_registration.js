var express = require('express');
var router = express.Router();
const{ create,patient_list,patient_verfiy,patient_info } = require("../../controller/helth_worker/patient_registration")
const upload = require("../../handler/multer")
const { chk_helth_status,checkLogin } = require("../../auth")

router.get("/patient_list/:userId",patient_list)
router.post("/patient_registration/:userId",create)
router.post("/patient_mobile_verfiy/:patientId",patient_verfiy)
router.put("/patient_details_reg/:patientId",upload.single('patient_img'),patient_info)

module.exports = router;