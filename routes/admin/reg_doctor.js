var express = require('express');
var router = express.Router();
const{ create } = require("../../controller/admin/reg_doctor")
// const upload = require("../handler/multer")

router.post("/admin/doctor_reg",create)

module.exports = router;