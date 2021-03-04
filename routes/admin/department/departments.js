var express = require('express');
var router = express.Router();
const{ create_dep,list_dep,edit_dep,remove_dep } = require("../../../controller/admin/department/departments")
const{ isAdmin } = require("../../../auth")

router.get("/admin/list_department/:adminId",isAdmin,list_dep)
router.post("/admin/add_department/:adminId",isAdmin,create_dep)
router.put("/admin/edit_department/:adminId/:depId",isAdmin,edit_dep)
router.delete("/admin/remove_department/:adminId/:depId",isAdmin,remove_dep)

module.exports = router;