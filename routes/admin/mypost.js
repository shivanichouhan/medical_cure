var express = require('express')
var router = express.Router()
const { mypostAdd,listmypost_doc,myXpost,editmypost,remove_myxpost } = require('../../controller/admin/mypost')
const upload = require("../../handler/multer")

router.post("/doctor/list_mypost",listmypost_doc) // mypost list api in doctor app
router.get("/admin/List_mypost",myXpost)
router.post("/admin/add_mypost",upload.single('poster'),mypostAdd)
router.put("/admin/edit_mypost/:mypostId",upload.single('poster'),editmypost)
router.delete("/admin/remove_mypost/:mypostId",remove_myxpost)

module.exports = router