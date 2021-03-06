var express = require('express');
var router = express.Router();
const{ create_app,list_app,edit_app,remove_app } = require("../../../controller/admin/appoinment/appoinments")
const{ isAdmin,checkLogin } = require("../../../auth")

router.get("/admin/list_appoinment",checkLogin,list_app)
router.post("/admin/add_appoinment/:patientId",checkLogin,create_app)
router.put("/admin/edit_appoinment/:appId",checkLogin,edit_app)
router.delete("/admin/remove_appoinment/:appId",checkLogin,remove_app)

module.exports = router;