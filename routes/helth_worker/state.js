var express = require('express');
var router = express.Router();
const multer = require('multer')

const { add_state,state_list,delete_state,bankadd,listBank } = require("../../controller/helth_worker/state")

router.post("/add_state",add_state);
router.get("/state_lists",state_list);
router.post("/add_bank",bankadd)
router.get("/bank_list",listBank)
router.delete("/delete_state",delete_state);

module.exports = router