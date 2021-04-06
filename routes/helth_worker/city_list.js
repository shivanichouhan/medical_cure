var express = require('express');
var router = express.Router();
const { district_add, list_state, list_district } = require("../../controller/helth_worker/city_list")

router.get("/health_worker/list_state",list_state)
router.post("/health_worker/list_district",list_district)
router.post("/health_worker/add_state_district",district_add)

module.exports = router;
