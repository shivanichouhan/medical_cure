var express = require('express');
var router = express.Router();
const{create_sal,list_sal,edit_sal,remove_sal } = require("../../controller/admin/emp_salary")
const upload = require("../../handler/multer")

router.get("/admin/list_emp_salary",list_sal)
router.post("/admin/add_emp_salary",create_sal)
router.edit("/admin/edit_emp_salary/:empId",edit_sal)
router.remove("/admin/remove_emp_salary/:empId",remove_sal)

module.exports = router;