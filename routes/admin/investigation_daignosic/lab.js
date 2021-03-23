var express = require('express');
var router = express.Router();
const{ list_lab,add_lab,edit_lab,remove_lab } = require("../../../controller/admin/investigation_daignosic/lab")
const{ checkLogin } = require("../../../auth")

router.get("/admin/lab_list",list_lab)
router.post("/admin/add_lab",add_lab)
router.put("/admin/edit_lab/:labId",edit_lab)
router.delete("/admin/remove_lab/:labId",remove_lab)

module.exports = router;