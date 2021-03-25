var express = require('express');
var router = express.Router();

const multer = require('multer')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
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

const{ doctor_edu,edit_educational } = require("../../controller/Doctor/doctor_educational")

router.put("/doctor_educational/:user_id",upload.array('certificate_Img'),doctor_edu)
router.put("/doctor/edit_educational/:user_id", upload.array('certificate_Img'), edit_educational)

module.exports = router;
