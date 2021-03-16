var express = require('express');
var router = express.Router();
const { list_insprire } = require("../../controller/Doctor/inspire_str")

router.get("/doctor/inspire_story",list_insprire)

module.exports = router;
