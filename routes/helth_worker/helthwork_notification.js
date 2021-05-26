var express = require('express');
var router = express.Router();

const {helthNotification,helthNotificationList} = require("../../controller/helth_worker/helthnotification")


router.post("/helthworker/helthNotification",helthNotification)
router.post("/helthworker/helthNotificationList",helthNotificationList)
module.exports = router;
