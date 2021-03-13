var express = require('express');
var router = express.Router();
const { cList,addcourse } = require("../../controller/helth_worker/courseList")

router.post("/health_worker/add_course",addcourse)
router.get("/health_worker/course_list",cList)

module.exports = router;