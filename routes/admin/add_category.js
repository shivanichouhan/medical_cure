var express = require('express');
var router = express.Router();
const{ create_cat,list_cat,edit_cat,remove_cat } = require("../../controller/admin/add_category")
const{ isAdmin } = require("../../auth")

router.get("/admin/category_list/:adminId",isAdmin,list_cat)
router.post("/admin/add_category/:adminId",isAdmin,create_cat)
router.put("/admin/edit_category/:adminId/:catId",isAdmin,edit_cat)
router.delete("/admin/remove_category/:adminId/:catId",isAdmin,remove_cat)

module.exports = router;