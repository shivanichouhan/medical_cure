var express = require('express');
var router = express.Router();
const{ add_comment } = require("../../controller/admin/blog_comment")
const { isAdmin,checkLogin } = require("../../auth")

router.post("/admin/add_comment",add_comment)

module.exports = router;