var express = require('express');
var router = express.Router();
const{ fess_add } = require("../../controller/admin/inspire")
const upload = require("../../handler/multer")

router.post("/admin/add_fees",fess_add)

module.exports = router;