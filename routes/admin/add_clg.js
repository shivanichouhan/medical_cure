var express = require('express');
var router = express.Router();
const { addClg,listClg,editClg,removeClg,addDegree,listDeg,listClgs } = require("../../controller/admin/add_clg")

router.get("/admin/lists_collages",listClgs) //for admin
router.get("/admin/list_collage",listClg)
router.post("/admin/add_collage",addClg)
router.put("/admin/edit_collage/:clgId",editClg)
router.delete("/admin/remove_collage/:clgId",removeClg)

router.get("/admin/list_degree",listDeg)
router.post("/admin/add_degree",addDegree)

module.exports = router;