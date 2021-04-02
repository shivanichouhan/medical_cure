var express = require('express');
var router = express.Router();

const { gen_orderId } = require("../../controller/helth_worker/payment")

router.post("/patient/payment_orderId",gen_orderId)

module.exports = router