var express = require('express');
var router = express.Router();
const{ create_disease,list_disease,edit_disease,remove_disease } = require("../../controller/admin/add_disease")
const upload = require('../../handler/multer')
const { isAdmin,checkLogin } = require('../../auth')

router.get("/admin/list_disease",list_disease)
router.post("/admin/add_disease",checkLogin,upload.single('icon'),create_disease)
router.put("/admin/edit_disease/:diseaseId",checkLogin,upload.single('icon'),edit_disease)
router.delete("/admin/remove_disease/:diseaseId",checkLogin,remove_disease)

module.exports = router;