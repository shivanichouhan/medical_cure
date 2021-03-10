var express = require('express');
var router = express.Router();
const{ create,patient_list,patient_verfiy } = require("../../controller/helth_worker/patient_registration")
const upload = require("../../handler/multer")

router.post("/patient_list/:userId",patient_list)
router.post("/patient_registration/:userId",upload.single('patient_img'),create)
router.post("/patient_mobile_verfiy",patient_verfiy)

module.exports = router;