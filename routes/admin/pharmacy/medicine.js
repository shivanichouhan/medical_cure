var express = require('express');
var router = express.Router();

const { med_list,med_add,med_remove,meds_lists } = require("../../../controller/admin/pharmacy/medicine")
const upload = require("../../../handler/multer")

router.get("/admin/lists_medicines",meds_lists) //for admin
router.get("/admin/list_medicine",med_list) 
router.post("/admin/add_medicine",upload.array('med_img'),med_add)
router.delete("/admin/remove_medicine/:medId",med_remove)

module.exports = router;