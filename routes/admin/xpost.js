var express = require('express')
var router = express.Router()
const { xpostAdd,listXpost_doc,listXpost,editXpost,remove_xpost } = require('../../controller/admin/xpost')
const upload = require("../../handler/multer")

router.get("/doctor/list_xpost",listXpost_doc) // xpost list api in doctor app
router.get("/admin/List_Xpost",listXpost)
router.post("/admin/add_xpost",upload.single('poster'),xpostAdd)
router.put("/admin/edit_xpost/:xpostId",upload.single('poster'),editXpost)
router.delete("/admin/remove_xpost/:xpostId",remove_xpost)

module.exports = router
