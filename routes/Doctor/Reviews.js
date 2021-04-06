var express = require('express');
var router = express.Router();
const{ doctor_reviews } = require("../../controller/Doctor/Reviews")
router.post("/doctor/reviews",doctor_reviews)





module.exports = router;