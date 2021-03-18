var express = require('express');
var router = express.Router();
const{ add_ac } = require("../../../controller/admin/accountant/add_ac")
const{ isAdmin,checkLogin } = require("../../../auth")

router.post('/admin/add_acountant/:adminId',isAdmin,add_ac)

module.exports = router;