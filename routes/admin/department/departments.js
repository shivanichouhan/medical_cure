var express = require('express');
var router = express.Router();
const{ create_dep,list_dep,edit_department,edit_dep,remove_dep } = require("../../../controller/admin/department/departments")
const{ isAdmin,checkLogin } = require("../../../auth")

router.get("/list_department",checkLogin,list_dep)
router.post("/admin/add_department",checkLogin,create_dep)
router.get("/edit_dep",edit_department)
router.put("/edit_department/:depId",checkLogin,edit_dep)
router.delete("/admin/remove_department/:depId",checkLogin,remove_dep)
router.put("/admin/manage_department_status/:depId",checkLogin,dep_status)

module.exports = router;