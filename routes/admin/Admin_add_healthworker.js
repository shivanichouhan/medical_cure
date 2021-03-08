var express = require('express');
var router = express.Router();
const upload = require("../../handler/multer")
const { checkLogin } = require("../../auth")
const { Add_Health_Worker,findhealthworker, DeleteHealthworker } = require('../../controller/admin/Admin_Add_Healthworker');

router.post("/admin/register_health_worker",checkLogin,upload.fields([{name:'certificate'},{name:'clinic'}]),Add_Health_Worker)
router.get("/admin/list_healthworkers",checkLogin,findhealthworker)
router.delete("/admin/remove_healthworker/:healthworkerId",checkLogin,DeleteHealthworker)

module.exports = router;
