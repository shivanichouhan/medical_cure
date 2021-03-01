var express = require('express');
var router = express.Router();
const{ create_cat,list_cat,edit_cat,remove_cat } = require("../../controller/admin/add_category")

router.get("/admin/category_list",list_cat)
router.post("/admin/add_category",create_cat)
router.put("/admin/edit_category/:catId",edit_cat)
router.delete("/admin/remove_category/:catId",remove_cat)

module.exports = router;