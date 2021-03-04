var express = require('express');
var router = express.Router();

const {list_cat_blog} = require("../controller/blog_list")


router.post("/blog_list",list_cat_blog)

module.exports = router;
