var express = require('express')
var router = express.Router()
const { addQuestions,editQuestions } = require('../../controller/admin/question_add')

router.post("/admin/addQuestions",addQuestions)
router.post("/admin/editQuestion",editQuestions)
// router.delete("/admin/remove_multipal_recharge",multipal_recharge_remove)
// router.get("/admin/recharge_info/:helthworker_id",rechargeInfo)

module.exports = router