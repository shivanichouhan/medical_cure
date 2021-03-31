var express = require('express');
var router = express.Router();
const { medicine_list,lab_test_list,add_alergies,list_alergies } = require("../../controller/Doctor/prescription")

router.get("/doctor/medicine_list",medicine_list)
router.get("/doctor/lab_test",lab_test_list)
router.get("/doctor/list_alergies",list_alergies)
router.post("/doctor/add_alergies",add_alergies)

module.exports = router;