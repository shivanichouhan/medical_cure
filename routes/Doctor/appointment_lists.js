var express = require('express');
var router = express.Router();
const {allAppointmentList}=require("../../controller/Doctor/appointment_lists")
router.post("/doctor/all_appointments",allAppointmentList)


module.exports = router;