var express = require('express');
var router = express.Router();
const{ offers } = require("../../controller/admin/offer_img")
const upload = require("../../handler/multer")

router.post("/admin/upload_offer_image",upload.array('offer'),offers)

module.exports = router;