var express = require('express');
var router = express.Router();


const {greetings,greetings1}=require("../../controller/helth_worker/jia_conversation");

router.post("/helthworker/greetings",greetings)
router.post('/helthworker/greetings1',greetings1)

module.exports = router;
