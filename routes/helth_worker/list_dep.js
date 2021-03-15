var express = require('express');
var router = express.Router();
const{ depList,desList } = require("../../controller/helth_worker/list_dep")

router.get("/health_worker/list_department",depList)
router.post("/health_worker/disease_list",desList) //perticular department wise disease list

module.exports = router;