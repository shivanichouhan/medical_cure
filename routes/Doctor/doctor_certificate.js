var express = require('express');
var router = express.Router();

//const upload = require("../../handler/multer")

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



const{ doctor_certificate } = require("../../controller/Doctor/doctor_certificate")

router.put("/doctor_certificate/:user_id",upload.array('certificate'),doctor_certificate)


module.exports = router;
