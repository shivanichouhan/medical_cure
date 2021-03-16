var express = require('express');
var router = express.Router();
const{ add_inspire,edit_inspire,remove_inspire } = require("../../controller/admin/inspire")
const upload = require("../../handler/multer")

router.post("/admin/inspire_story",upload.single('img'),add_inspire)
router.put("/admin/edit_inspire_str/:insId",upload.single('img'),edit_inspire)
router.delete("/admin/delete_inspire/:insId",remove_inspire)

module.exports = router;