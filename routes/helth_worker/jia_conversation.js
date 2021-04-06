var express = require('express');
var router = express.Router();


const { greetings, greetings1,patient_accept_status,booked_patient,accept_patient, greetings2,sendMsg_to_doctor, greetings3, greetings4, greetings5, doctor_sagastion,anathor_doctor } = require("../../controller/helth_worker/jia_conversation");

router.post("/helthworker/greetings", greetings)
router.post('/helthworker/greetings1', greetings1)
router.post("/helthworker/greetings2", greetings2)
router.post("/helthworker/greetings3", greetings3);
router.post("/helthworker/greetings4", greetings4);
router.post("/helthworker/greetings5", greetings5)
router.post("/helthworker/doctor_suggestion",doctor_sagastion)
router.post("/helthworker/anathorDoctor_suggestion",anathor_doctor)
router.post("/helthworker/sendMsg_to_doctor",sendMsg_to_doctor)
router.post("/helthworker/booked_patient",booked_patient)
router.post("/helthworker/accept_patient",accept_patient)
router.post("/helthworker/patient_request_status",patient_accept_status)
module.exports = router;
