var express = require('express');
var router = express.Router();

const multer = require('multer')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: (req, file, cb) => {
    if (file.originalname.length > 15)
      cb(
        null,
        file.fieldname +
          '-' +
          Date.now() +
          file.originalname.substr(
            file.originalname.length - 15,
            file.originalname.length
          )
      )
    else cb(null, file.fieldname + '-' + Date.now( ) + file.originalname)
  }
})
var upload = multer({ storage: storage })

const{ doctor_reg,reg_list, edit_regis_list } = require("../../controller/Doctor/registration")
router.post("/doctor_regis",doctor_reg)
router.get("/doctor/regis_list/:user_id",reg_list)
router.put("/doctor/edit_regis_list/:user_id",upload.array('certificate_Img'),edit_regis_list)
module.exports = router;