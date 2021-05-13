var express = require('express');
var router = express.Router();
const { medicine_list,
        lab_test_list,
        add_alergies,
        list_alergies,
        list_daignosis,
        add_daignosis,
        add_prescription,
        med_info,
        list_med_info,
        lab_info,list_lab_info,
        daignosis_name,
        list_dai,
        alergies_name,
        alergies_list } = require("../../controller/Doctor/prescription")

const upload = require("../../handler/multer")

router.get("/doctor/medicine_list",medicine_list)
router.get("/doctor/lab_test",lab_test_list)
router.get("/doctor/list_alergies",list_alergies)
router.post("/doctor/add_alergies",add_alergies)
router.get("/doctor/filter_daignosis",list_daignosis)
router.post("/doctor/add_daignosis",add_daignosis)
router.post("/doctor/add_prescription",add_prescription)

router.post("/doctor/list_medicine_info",list_med_info)
router.post("/doctor/add_medicine_info",med_info)

router.post("/doctor/list_lab_test_info",list_lab_info)
router.post("/doctor/add_lab_test_info",lab_info)

router.post("/doctor/prescription_add_daignosis",daignosis_name)
router.post("/doctor/prescription_list_daignosis",list_dai)

router.post("/doctor/prescription_add_alergies",alergies_name)
router.post("/doctor/prescription_list_alergies",alergies_list)



module.exports = router;