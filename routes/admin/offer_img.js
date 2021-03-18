var express = require('express');
var router = express.Router();
const{ offers,list_offer } = require("../../controller/admin/offer_img")
const upload = require("../../handler/multer")

router.get("/admin/list_offer_img",list_offer)
router.post("/admin/upload_offer_image",upload.array('offer'),offers)

module.exports = router;