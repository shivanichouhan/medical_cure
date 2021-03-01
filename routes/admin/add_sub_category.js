var express = require('express');
var router = express.Router();
const{ create_sub_cat,edit_sub_cat,remove_sub_cat } = require("../../controller/admin/add_sub_category")

router.post("/admin/add_sub_category",create_sub_cat)
router.put("/admin/edit_sub_category/:subcatId",edit_sub_cat)
router.delete("/admin/remove_sub_category/:subcatId",remove_sub_cat)

module.exports = router;