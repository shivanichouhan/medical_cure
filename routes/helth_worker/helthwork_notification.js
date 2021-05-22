var express = require('express');
var router = express.Router();

const {helthNotification} = require("../../controller/helth_worker/helthnotification")


router.post("/helthworker/helthNotification",helthNotification)
module.exports = router;
