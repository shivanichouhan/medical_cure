var express = require('express');
var router = express.Router();
const { list,depList } = require("../../controller/Doctor/area_of_interest")

router.get("/doctor/list_department",depList)
router.get("/doctor/list_area_of_interest",list)

module.exports = router;
