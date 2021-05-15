const { Router } = require('express');
var express = require('express');
var router = express.Router();

const {patient_ragister,patient_otp_verify}=require("../../controller/helpLine_App/patient_ragister");


router.post("/helpline/patient_ragister",patient_ragister)
router.post("/helpline/patient_otp_verify",patient_otp_verify)


module.exports = router;