var express = require('express');
var router = express.Router();
const{ cureBlogList,spec_dis_list } = require("../../controller/Doctor/search_cureblog")

router.post("/doctor/search_cure_blog",cureBlogList)
router.post("/doctor/search_specilist_disease",spec_dis_list)

module.exports = router;