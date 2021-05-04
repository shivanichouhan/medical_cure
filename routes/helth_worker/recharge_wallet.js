var express = require('express');
var router = express.Router();

const { generate_orderId,recharge_verify,recharge_history } = require("../../controller/helth_worker/rechargeWallet")

router.post("/helthworker/payment_orderId",generate_orderId)
router.post("/helthworker/recharge_verify",recharge_verify)
router.post("/helthworker/recharge_history",recharge_history)

module.exports = router