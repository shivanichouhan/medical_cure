var express = require('express');
var router = express.Router();
const {list_blog} = require("../controller/blog_list")

router.get("/blog_list",list_blog)

module.exports = router;
