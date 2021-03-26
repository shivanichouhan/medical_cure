var express = require('express');
var router = express.Router();
const{ list_patient,update_patient,remove_patient } = require("../../controller/admin/patient")
const upload = require("../../handler/multer")
const { checkLogin } = require("../../auth")

router.get('/admin/list_patient',list_patient)

router.put('/admin/edit_patient/:patientId',upload.single('patient_img'),update_patient)
router.delete('/admin/remove_patient/:patientId',remove_patient)

module.exports = router;