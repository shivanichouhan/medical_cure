var express = require('express');
var router = express.Router();
// const{ create_dep,list_dep,edit_department,edit_dep,remove_dep } = require("../../../controller/admin/department/departments")
const{add_department, create_dep,edit_department,list_dep,edit_dep,remove_dep,dep_status } = require("../../../controller/admin/department/departments")
const{ isAdmin,checkLogin } = require("../../../auth")
const upload = require("../../../handler/multer")

// router.get("/admin/add_depart",add_department)
router.get("/admin/list_department",list_dep)
router.post("/admin/add_department",create_dep)
router.get("/admin/edit_dep",edit_department)
router.post("/admin/edit_department",upload.single("dep_images"),edit_dep)
router.post("/admin/remove_department",remove_dep)
router.put("/admin/manage_department_status/:depId",dep_status)

module.exports = router;


