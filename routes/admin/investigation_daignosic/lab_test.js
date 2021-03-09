var express = require('express');
var router = express.Router();
const{ list_test,add_test,edit_test,remove_test } = require("../../../controller/admin/investigation_daignosic/lab_test")
const{ checkLogin } = require("../../../auth")

router.get("/admin/list_lab_test",checkLogin,list_test)
router.post("/admin/add_lab_test",checkLogin,add_test)
router.put("/admin/edit_lab_test/:testId",checkLogin,edit_test)
router.delete("/admin/remove_lab_test/:testId",checkLogin,remove_test)

module.exports = router;