var express = require('express');
var router = express.Router();
const{ create } = require("../../controller/admin/add_specialist")
const upload = require("../../handler/multer")

router.post("/admin/add_specialist",upload.single('specialist_img'),create)

module.exports = router;