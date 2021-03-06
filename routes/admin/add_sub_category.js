var express = require('express');
var router = express.Router();
const{ create_sub_cat,edit_sub_cat,remove_sub_cat } = require("../../controller/admin/add_sub_category")
const { isAdmin } = require("../../auth")

router.post("/admin/add_sub_category/:adminId",isAdmin,create_sub_cat)
router.put("/admin/edit_sub_category/:adminId/:subcatId",isAdmin,edit_sub_cat)
router.delete("/admin/remove_sub_category/:adminId/:subcatId",isAdmin,remove_sub_cat)

module.exports = router;