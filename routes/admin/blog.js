var express = require('express');
var router = express.Router();
const { create_blog, list_blog,home_pageBlog, remove_blog, edit_blog, blog_status,blogInfo,blog_search,lists_blogs,blogDetails } = require("../../controller/admin/blog")
const { checkLogin } = require("../../auth")
const upload = require("../../handler/multer")

router.post("/admin/blog_info/:blogId",blogInfo)

router.get("/admin/blogs_lists", lists_blogs)//for admin
router.get("/admin/blog_list", list_blog)
router.get("/admin/homepage_blog",home_pageBlog)

router.post("/admin/add_blog",upload.fields([{name:'blog_img'},{name:'thumb_img'},{name:'blog_video'}]),create_blog);

router.put("/admin/edit_blog/:blogId", upload.fields([{name:'blog_img'},{name:'thumb_img'},{name:'blog_video'}]), edit_blog)

router.delete("/admin/remove_blog/:blogId", remove_blog)
router.put("/admin/manage_blog_status", blog_status)
router.post("/admin/blog_search",blog_search)

module.exports = router;