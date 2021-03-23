var express = require('express');
var router = express.Router();


const {greetings}=require("../../controller/helth_worker/jia_conversation");

router.post("/helthworker/greetings",greetings)
//router.get('/image_data',image_data)

module.exports = router;
