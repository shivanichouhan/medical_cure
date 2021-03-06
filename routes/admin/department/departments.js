var express = require('express');
var router = express.Router();
const{ create_dep,list_dep,edit_dep,remove_dep } = require("../../../controller/admin/department/departments")
const{ isAdmin,checkLogin } = require("../../../auth")

router.get("/admin/list_department",checkLogin,list_dep)
router.post("/admin/add_department",checkLogin,create_dep)
router.put("/admin/edit_department/:depId",checkLogin,edit_dep)
router.delete("/admin/remove_department/:depId",checkLogin,remove_dep)

module.exports = router;