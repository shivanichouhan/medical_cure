var express = require('express');
var router = express.Router();
const { notification,list_notification } = require("../../controller/Doctor/notification")

router.post("/doctor/list_notification",list_notification)
router.post("/doctor/send_notification",notification)


module.exports = router;