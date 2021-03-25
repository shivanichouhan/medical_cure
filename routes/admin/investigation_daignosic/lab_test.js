var express = require('express');
var router = express.Router();
const{ list_test,add_test,edit_test,remove_test,status_testLab } = require("../../../controller/admin/investigation_daignosic/lab_test")
const{ checkLogin } = require("../../../auth")

router.get("/admin/list_lab_test",list_test)
router.post("/admin/add_lab_test",add_test)
router.put("/admin/edit_lab_test/:testId",edit_test)
router.put("/admin/manage_status_lab_test/:lab_testId",status_testLab)
router.delete("/admin/remove_lab_test/:testId",remove_test)

module.exports = router;