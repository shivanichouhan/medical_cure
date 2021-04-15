var express = require('express');
var router = express.Router();
const{ list_emp,reg_emp,remove_emp,emp_status } = require("../../../controller/admin/employee/emp_reg")
const{ isAdmin,checkLogin } = require("../../../auth")
const upload = require("../../../handler/multer")

router.get('/admin/list_employee',list_emp)
router.post('/admin/add_employee',upload.fields([{name:'front_identity'},{name:'back_identity'},{name:'profile_pic'}]),reg_emp)
router.delete('/admin/remove_employee',remove_emp)
router.put('/admin/manage_status_employee',emp_status)

module.exports = router;

