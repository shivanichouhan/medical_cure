var express = require('express');
var router = express.Router();
const {list_blog,pertucularBlog} = require("../../controller/helth_worker/blog_list")

router.get("/blog_list",list_blog)
router.get("/blog_data/:blog_id",pertucularBlog)

module.exports = router;
