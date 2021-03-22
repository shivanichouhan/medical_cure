var express = require('express');
var router = express.Router();
const { addCity,listCity,editCity,removeCity } = require("../../../controller/admin/state_city/add_city")

router.get("/admin/list_city",listCity)
router.post("/admin/add_city",addCity)
router.put("/admin/edit_city/:cityId",editCity)
router.delete("/admin/remove_city/:cityId",removeCity)

module.exports = router;
