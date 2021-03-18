var express = require('express');
var router = express.Router();
const{list_cure_blog,add_cure_blog, edit_cure_blog,remove_cure_blog } = require("../../../controller/admin/marketing/cure_blog")
const{ isAdmin } = require("../../../auth")
const upload = require("../../../handler/multer")

router.get("/admin/list_cure_blog",list_cure_blog)
router.post("/admin/add_cure_blog",upload.array('blog_img'),add_cure_blog)
router.put("/admin/edit_cure_blog/:blogId",upload.array('blog_img'),edit_cure_blog)
router.delete("/admin/remove_cure_blog/:blogId",remove_cure_blog)

module.exports = router;