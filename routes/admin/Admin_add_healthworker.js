var express = require('express');
var router = express.Router();
const upload = require("../../handler/multer")
const { checkLogin } = require("../../auth")
const { health_signup,Add_Health_Worker,
    searchHelthworker,healthworkerVarify,
    findhealthworker, DeleteHealthworker,helthworker_status } = require('../../controller/admin/Admin_Add_Healthworker');

router.post("/admin/health_worker_signup",health_signup)
router.post("/admin/register_health_worker",upload.fields([{name:'certificate'},{name:'clinic'}]),Add_Health_Worker)
router.get("/admin/list_healthworkers",findhealthworker)
router.post("/admin/search_helthworkers",searchHelthworker)

router.get("/admin/verify_helthworkers",healthworkerVarify)

router.delete("/admin/remove_healthworker",DeleteHealthworker)
router.put("/admin/manage_status_healthworker",helthworker_status)

module.exports = router;
