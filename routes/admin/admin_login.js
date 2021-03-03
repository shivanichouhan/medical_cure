var express = require('express');
var router = express.Router();

const { signin,signup }=require('../../controller/admin/admin_login');

router.post("/admin_signup",signup)
router.post("/admin_signin",signin)

module.exports = router;