var express = require('express');
var router = express.Router();
const {  } = require("")

router.get("/admin/list_collage",listClg)
router.post("/admin/add_collage",addClg)
router.put("/admin/edit_collage/:clgId",editClg)
router.delete("/admin/remove_collage/:clgId",removeClg)

module.exports = router;