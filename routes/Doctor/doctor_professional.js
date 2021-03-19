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
    else cb(null, file.fieldname + '-' + Date.now() + file.originalname)
  }
})


var upload = multer({ storage: storage })

const {doctor_professional, Edit_doctor_professional} = require('../../controller/Doctor/doctor_professional');
router.put("/Professional_details/:user_id",upload.fields([{name:'License_img_front_side'},{name:'License_img_back_side'}]),doctor_professional)
router.put("/Edit_lincense_details/:user_id",Edit_doctor_professional)

module.exports = router;
