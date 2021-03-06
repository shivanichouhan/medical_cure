var express = require('express');
var router = express.Router();
const{ list_cat_blog,create_subcat_blog,edit_subcat_blog,remove_subcat_blog } = require("../../controller/admin/blog_sub_cat")
const { isAdmin,checkLogin } = require("../../auth")

// router.get("/admin/blog_cat_list/:adminId",isAdmin,list_cat_blog)
router.post("/admin/add_blog_sub_category",checkLogin,create_subcat_blog)
router.put("/admin/edit_blog_sub_category/:subcatId",checkLogin,edit_subcat_blog)
router.delete("/admin/remove_blog_sub_category/:subcatId",checkLogin,remove_subcat_blog)

module.exports = router;