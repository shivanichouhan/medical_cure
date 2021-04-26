var express = require('express');
var router = express.Router();
const { medicine_list,lab_test_list,add_alergies,list_alergies,list_daignosis,add_daignosis,add_prescription } = require("../../controller/Doctor/prescription")
const upload = require("../../handler/multer")

router.get("/doctor/medicine_list",medicine_list)
router.get("/doctor/lab_test",lab_test_list)
router.get("/doctor/list_alergies",list_alergies)
router.post("/doctor/add_alergies",add_alergies)
router.post("/doctor/filter_daignosis",list_daignosis)
router.post("/doctor/add_daignosis",add_daignosis)
router.post("/doctor/add_prescription",add_prescription)

module.exports = router;