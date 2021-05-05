var express = require('express')
var router = express.Router()
const { xpostAdd,listXpost_doc } = require('../../controller/admin/xpost')
const upload = require("../../handler/multer")

router.get("/doctor/list_xpost",listXpost_doc)
router.post("/admin/add_xpost",upload.single('poster'),xpostAdd)


module.exports = router
