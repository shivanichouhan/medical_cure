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

const {doctor_identity, edit_doctor_identity} = require('../../controller/Doctor/doctor_identity');
router.put("/Identity_details/:user_id",upload.fields([{name:'PanCard_front_side_img'},{name:'PanCard_back_side_img'}]),doctor_identity)
router.put("/doctor/edit_Identity_details/:user_id",/*upload.fields([{name:'PanCard_front_side_img'},{name:'PanCard_back_side_img'}]),*/edit_doctor_identity)

module.exports = router;
