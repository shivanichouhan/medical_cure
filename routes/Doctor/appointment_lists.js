var express = require('express');
var router = express.Router();
const {allAppointmentList,completeAppointmentlist}=require("../../controller/Doctor/appointment_lists")
router.post("/doctor/all_appointments",allAppointmentList)
router.post("/doctor/complete_appointments",completeAppointmentlist)


module.exports = router;