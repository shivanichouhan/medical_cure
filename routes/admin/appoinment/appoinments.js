var express = require('express');
var router = express.Router();
const{ create_app,list_app,edit_app,remove_app } = require("../../../controller/admin/appoinment/appoinments")
const{ isAdmin } = require("../../../auth")

router.get("/admin/list_appoinment/:adminId",isAdmin,list_app)
router.post("/admin/add_appoinment/:adminId/:patientId",isAdmin,create_app)
router.put("/admin/edit_appoinment/:adminId/:appId",isAdmin,edit_app)
router.delete("/admin/remove_appoinment/:adminId/:appId",isAdmin,remove_app)

module.exports = router;