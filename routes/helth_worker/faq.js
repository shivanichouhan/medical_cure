var express = require('express');
var router = express.Router();
const { faqQuestionList,addFaqQuestion } = require("../../controller/helth_worker/faq")

router.post("/health_worker/addFaqQuestion",addFaqQuestion)
router.get("/health_worker/faqQuestionList",faqQuestionList)

module.exports = router;