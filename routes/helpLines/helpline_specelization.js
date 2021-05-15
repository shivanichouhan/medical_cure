const { Router } = require('express');
var express = require('express');
var router = express.Router();

const {helpLine_specelization,helpLine_specelization_list}=require("../../controller/helpLine_App/helpline_specelization");


router.post("/helpline/specilization_add",helpLine_specelization)
router.get("/helpline/specilization_list",helpLine_specelization_list)


module.exports = router;