var express = require('express');
var router = express.Router();
const{ create_disease,list_disease,edit_disease,remove_disease,lists_diseases } = require("../../controller/admin/add_disease")
const upload = require('../../handler/multer')
const { isAdmin,checkLogin } = require('../../auth')

router.get("/admin/lists_diseases",lists_diseases) //for admin
router.get("/admin/list_disease",list_disease)
router.post("/admin/add_disease",upload.single('icon'),create_disease)
router.put("/admin/edit_disease/:diseaseId",upload.single('icon'),edit_disease)
router.delete("/admin/remove_disease/:diseaseId",remove_disease)

module.exports = router;