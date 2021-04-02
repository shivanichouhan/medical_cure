var express = require('express');
var router = express.Router();
const { list_comission,add_comission,edit_comission,remove_comission } = require("../../controller/admin/comission")

router.get("/admin/list_comission",list_comission)
router.post("/admin/add_comission",add_comission)
router.put("/admin/edit_comission/:comisionId",edit_comission)
router.delete("/admin/remove_comission/:comisionId",remove_comission)

module.exports = router;