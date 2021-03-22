var express = require('express');
var router = express.Router();
const{ create_child_cat,edit_child_cat,remove_child_cat,list_child_cat } = require("../../controller/admin/blog_child_cat")
const { isAdmin,checkLogin } = require("../../auth")

router.get('/admin/list_child_cat',list_child_cat)
router.post('/admin/add_child_cat',create_child_cat)
router.put('/admin/edit_child_cat/:childCat',edit_child_cat)
router.delete('/admin/remove_child_cat/:childCat',remove_child_cat)

module.exports = router;