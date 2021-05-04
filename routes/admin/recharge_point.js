var express = require('express')
var router = express.Router()
const { rechargeList,rechageRemove,rechargeInfo,multipal_recharge_remove } = require('../../controller/admin/recharge_point')

router.get("/admin/list_of_recharge",rechargeList)
router.delete("/admin/remove_recharge/:rechargeId",rechageRemove)
router.delete("/admin/remove_multipal_recharge",multipal_recharge_remove)
router.get("/admin/recharge_info/:helthworker_id",rechargeInfo)

module.exports = router