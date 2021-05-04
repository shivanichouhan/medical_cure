var express = require('express');
var router = express.Router();

const { generate_orderId,recharge_verify } = require("../../controller/helth_worker/rechargeWallet")

router.post("/helthworker/payment_orderId",generate_orderId)
router.post("/helthworker/recharge_verify",recharge_verify)

module.exports = router