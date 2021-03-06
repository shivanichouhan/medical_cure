var express = require('express');
var router = express.Router();
const{ create_disease,list_disease,edit_disease,remove_disease } = require("../../controller/admin/add_disease")
const upload = require('../../handler/multer')
const { isAdmin } = require('../../auth')

router.get("/admin/list_disease/:adminId",isAdmin,list_disease)
router.post("/admin/add_disease/:adminId",isAdmin,upload.single('icon'),create_disease)
router.put("/admin/edit_disease/:adminId/:diseaseId",isAdmin,upload.single('icon'),edit_disease)
router.delete("/admin/remove_disease/:adminId/:diseaseId",isAdmin,remove_disease)

module.exports = router;