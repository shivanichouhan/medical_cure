var express = require('express');
var router = express.Router();


const {total_doctors,totalDoctor_mitra,totalPatients}=require("../../controller/admin/analytics");

router.get("/admin/total_doctors",total_doctors)
router.get("/admin/totalDoctor_mitra",totalDoctor_mitra);
router.get("/admin/totalPatients",totalPatients)

module.exports = router;