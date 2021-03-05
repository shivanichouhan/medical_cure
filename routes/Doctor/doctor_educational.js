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

const{ doctor_edu } = require("../../controller/Doctor/doctor_educational")

router.post("/doctor_educational/:user_id",upload.single('certificate_Img'),doctor_edu)

module.exports = router;
