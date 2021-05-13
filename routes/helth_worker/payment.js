var express = require('express');
var router = express.Router();

const { gen_orderId,payment_verfiy,creditHistory } = require("../../controller/helth_worker/payment")

router.post("/patient/payment_orderId",gen_orderId)
router.post("/patient/payment_verify",payment_verfiy)
router.post("/payment/credit_history",creditHistory)

module.exports = router