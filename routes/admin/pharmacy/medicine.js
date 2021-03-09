var express = require('express');
var router = express.Router();
const{ checkLogin } = require("../../../auth")
const { med_list,med_add,med_remove } = require("../../../controller/admin/pharmacy/medicine")
const upload = require("../../../handler/multer")

router.get("/admin/list_medicine",checkLogin,med_list)
router.post("/admin/add_medicine",checkLogin,upload.array('med_img'),checkLogin,med_add)
router.delete("/admin/remove_medicine/:medId",checkLogin,med_remove)

module.exports = router;