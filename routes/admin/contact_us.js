var express = require('express');
var router = express.Router();
const{ contact } = require("../../controller/admin/contact_us")
router.post("/admin/contact_us",contact)

module.exports = router;