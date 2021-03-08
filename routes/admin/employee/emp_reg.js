var express = require('express');
var router = express.Router();
const{ list_emp,reg_emp,remove_emp,emp_status } = require("../../../controller/admin/employee/emp_reg")
const{ isAdmin,checkLogin } = require("../../../auth")
const upload = require("../../../handler/multer")

router.get('/admin/list_employee',checkLogin,list_emp)
router.post('/admin/add_employee',checkLogin,upload.fields([{name:'front_identity'},{name:'back_identity'}]),reg_emp)
router.delete('/admin/remove_employee',checkLogin,remove_emp)
router.put('/admin/manage_status_employee',checkLogin,emp_status)

module.exports = router;

