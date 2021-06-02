var express = require('express');
var router = express.Router();
const{ createDoctor_cat,last_three_month,doctSubCategories,createSubCategory,all_category} = require("../../controller/Doctor/doctorCategory")

router.post("/doctor/create_cat",createDoctor_cat)
router.post("/doctor/create_subCat",createSubCategory)
router.get("/doctor/doctSubCategories",doctSubCategories)
router.get("/doctor/all_category",all_category)
router.get("/doctor/monthdata",last_three_month)


module.exports = router;