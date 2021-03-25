var express = require('express');
var router = express.Router();
const{ fess_add,fees_list,fees_edit,fees_remove } = require("../../controller/admin/inspire")

router.get("/admin/list_fees",fees_list)
router.post("/admin/add_fees",fess_add)
router.put("/admin/edit_fees/:feesId",fees_edit)
router.delete("/admin/remove_fees/:feesId",fees_remove)

module.exports = router;