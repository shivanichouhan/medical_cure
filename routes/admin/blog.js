var express = require('express');
var router = express.Router();
const{ create_blog,list_blog,remove_blog,edit_blog,blog_status } = require("../../controller/admin/blog")
const { checkLogin } = require("../../auth")
const upload = require("../../handler/multer")

router.get("/admin/blog_list",checkLogin,list_blog)
router.post("/admin/add_blog",checkLogin,upload.array('blog_img'),create_blog)
router.put("/admin/edit_blog/:blogId",checkLogin,upload.array('blog_img'),edit_blog)
router.delete("/admin/remove_blog/:blogId",checkLogin,remove_blog)
router.put("/admin/manage_blog_status",checkLogin,blog_status)

module.exports = router;