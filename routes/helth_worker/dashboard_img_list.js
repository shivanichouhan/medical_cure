var express = require('express');
var router = express.Router();
const{ offerList,bannerList } = require("../../controller/helth_worker/dashboard_img_list")


router.get("/banner_list_img",bannerList)
router.get("/offer_list_img",offerList)

module.exports = router;