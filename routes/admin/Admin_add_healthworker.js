var express = require('express');
var router = express.Router();
const upload = require("../../handler/multer")
const { checkLogin } = require("../../auth")
const { health_signup,Add_Health_Worker,findhealthworker, DeleteHealthworker,helthworker_status } = require('../../controller/admin/Admin_Add_Healthworker');

router.post("/admin/health_worker_signup",health_signup)
router.post("/admin/register_health_worker",checkLogin,upload.fields([{name:'certificate'},{name:'clinic'}]),Add_Health_Worker)
router.get("/admin/list_healthworkers",checkLogin,findhealthworker)
router.delete("/admin/remove_healthworker",checkLogin,DeleteHealthworker)
router.put("/admin/manage_status_healthworker",checkLogin,helthworker_status)

module.exports = router;
