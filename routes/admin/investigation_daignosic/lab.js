var express = require('express');
var router = express.Router();
const{ list_lab,add_lab,edit_lab,remove_lab,lab_status,active_lab } = require("../../../controller/admin/investigation_daignosic/lab")
const{ checkLogin } = require("../../../auth")

router.get("/admin/lab_list",list_lab)
router.get("/admin/active_lab_list",active_lab)
router.post("/admin/add_lab",add_lab)
router.put("/admin/edit_lab/:labId",edit_lab)
router.put("/admin/manage_lab_status/:labId",lab_status)
router.delete("/admin/remove_lab/:labId",remove_lab)

module.exports = router;