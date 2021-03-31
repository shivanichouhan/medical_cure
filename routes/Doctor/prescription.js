var express = require('express');
var router = express.Router();
const { medicine_list,lab_test_list } = require("../../controller/Doctor/prescription")

router.get("/doctor/medicine_list",medicine_list)
router.get("/doctor/lab_test",lab_test_list)

module.exports = router;