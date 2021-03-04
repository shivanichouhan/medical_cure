var express = require('express');
var router = express.Router();
const{ create_blog,list_blog,remove_blog,edit_blog } = require("../../controller/admin/blog")
const upload = require("../../handler/multer")

router.get("/admin/blog_list",list_blog)
router.post("/admin/add_blog",upload.array('blog_img'),create_blog)
router.put("/admin/edit_blog/:blogId",upload.array('blog_img'),edit_blog)
router.delete("/admin/remove_blog/:blogId",remove_blog)

module.exports = router;