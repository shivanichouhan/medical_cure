var express = require('express');
var router = express.Router();
const{ banner,list_img } = require("../../controller/admin/banner_img")
const upload = require("../../handler/multer")

router.get("/admin/list_banner_image",list_img)
router.post("/admin/upload_banner_image",upload.array('banner'),banner)

module.exports = router;