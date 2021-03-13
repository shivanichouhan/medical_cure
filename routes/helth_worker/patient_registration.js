var express = require('express');
var router = express.Router();
const{ create,patient_list,patient_verfiy,patient_info } = require("../../controller/helth_worker/patient_registration")
const upload = require("../../handler/multer")
const { chk_helth_status } = require("../../auth")

router.post("/patient_list/:userId",chk_helth_status,patient_list)
router.post("/patient_registration/:userId",chk_helth_status,upload.single('patient_img'),create)
router.post("/patient_mobile_verfiy/:userId",chk_helth_status,patient_verfiy)
router.put("/patient_details_reg/:userId/:patientId",chk_helth_status,upload.single('patient_img'),patient_info)

module.exports = router;