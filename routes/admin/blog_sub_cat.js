var express = require('express');
var router = express.Router();
const{ list_subcat_blog,create_subcat_blog,edit_subcat_blog,remove_subcat_blog } = require("../../controller/admin/blog_sub_cat")
const { isAdmin,checkLogin } = require("../../auth")

router.get("/admin/blog_subcat_list",list_subcat_blog)
router.post("/admin/add_blog_sub_category",create_subcat_blog)
router.put("/admin/edit_blog_sub_category/:subcatId",edit_subcat_blog)
router.delete("/admin/remove_blog_sub_category/:subcatId",remove_subcat_blog)

module.exports = router;