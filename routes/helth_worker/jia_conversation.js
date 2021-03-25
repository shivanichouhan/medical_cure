var express = require('express');
var router = express.Router();


const {greetings,greetings1,greetings2}=require("../../controller/helth_worker/jia_conversation");

router.post("/helthworker/greetings",greetings)
router.post('/helthworker/greetings1',greetings1)
router.post("/helthworker/greetings2",greetings2)

module.exports = router;
