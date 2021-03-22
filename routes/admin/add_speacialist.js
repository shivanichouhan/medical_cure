var express = require('express');
var router = express.Router();
const{ create,list_specilist,edit_specilist,remove_specilist } = require("../../controller/admin/add_specialist")
const upload = require("../../handler/multer")

router.get("/admin/list_specialist",list_specilist)
router.post("/admin/add_specialist",upload.single('specialist_img'),create)
router.put("/admin/edit_specialist/:specialistId",upload.single('specialist_img',edit_specilist))
router.delete("/admin/remove_specialist/:specialistId",remove_specilist)

module.exports = router;