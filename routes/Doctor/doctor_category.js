var express = require('express');
var router = express.Router();
const{ createDoctor_cat,createSubCategory,all_category} = require("../../controller/Doctor/doctorCategory")

router.post("/doctor/create_cat",createDoctor_cat)
router.post("/doctor/create_subCat",createSubCategory)
router.get("/doctor/all_category",all_category)

module.exports = router;