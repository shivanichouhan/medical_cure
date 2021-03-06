var express = require('express');
var router = express.Router();

const { signin,signup,logout }=require('../../controller/admin/admin_login');

router.post("/admin_signup",signup)
router.post("/admin_signin",signin)
router.get("/admin_logout",logout)

module.exports = router;