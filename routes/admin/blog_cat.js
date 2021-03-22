var express = require('express');
var router = express.Router();
const{ list_cat_blog,create_cat_blog,edit_cat_blog,remove_cat_blog } = require("../../controller/admin/blog_cat")
const { isAdmin,checkLogin } = require("../../auth")

router.get("/admin/blog_cat_list",list_cat_blog)
router.post("/admin/add_blog_category",create_cat_blog)
router.put("/admin/edit_blog_category/:catId",edit_cat_blog)
router.delete("/admin/remove_blog_category/:catId",remove_cat_blog)

module.exports = router;