var express = require('express');
var router = express.Router();
const{ list_patient } = require("../../controller/admin/patient")
const { checkLogin } = require("../../auth")

router.get('/admin/list_patient',checkLogin,list_patient)

module.exports = router;