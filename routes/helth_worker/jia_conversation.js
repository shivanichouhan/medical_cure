var express = require('express');
var router = express.Router();


const {greetings,greetings1,greetings2,greetings3}=require("../../controller/helth_worker/jia_conversation");

router.post("/helthworker/greetings",greetings)
router.post('/helthworker/greetings1',greetings1)
router.post("/helthworker/greetings2",greetings2)
router.post("/helthworker/greetings3",greetings3)

module.exports = router;
