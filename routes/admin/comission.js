var express = require('express');
var router = express.Router();
const { add_comission } = require("")

router.post("/admin/add_comission",add_comission)

module.exports = router;