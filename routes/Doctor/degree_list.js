var express = require('express');
var router = express.Router();
const{ addCer,list_cer,addPg,list_pg,add_super,list_super,list_specilization,clgAdd,list_clg,licence_Auth_Add,list_licence_auth } = require("../../controller/Doctor/degree_list")

router.post("/doctor/add_pg",addPg)
router.post("/doctor/add_certificate",addCer)
router.post("/doctor/add_super_specilist",add_super)
router.post("/doctor/add_clg",clgAdd)
router.post("/doctor/medical_licence_auth",licence_Auth_Add)

router.get("/doctor/list_medical_licence_auth",list_licence_auth)
router.get("/doctor/certificate_list",list_cer)
router.get("/doctor/pg_list",list_pg)
router.get("/doctor/super_specilist",list_super)
router.get("/doctor/specilization_list",list_specilization)
router.get("/doctor/collage_list",list_clg)

module.exports = router;