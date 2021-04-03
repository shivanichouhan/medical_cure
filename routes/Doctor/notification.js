var express = require('express');
var router = express.Router();
const { notification } = require("../../controller/Doctor/notification")

router.post("/doctor/send_notification",notification)

module.exports = router;