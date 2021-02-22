var express = require('express');
var router = express.Router();

const multer = require('multer')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    if (file.originalname.length > 6)
      cb(
        null,
        file.fieldname +
          '-' +
          Date.now() +
          file.originalname.substr(
            file.originalname.length - 6,
            file.originalname.length
          )
      )
    else cb(null, file.fieldname + '-' + Date.now() + file.originalname)
  }
})
var upload = multer({ storage: storage })

const {normal_signup,normal_signin,otp_send,otp_verify}=require('../controller/users');

router.post("/signin_user",normal_signin)
router.post("/register_user",normal_signup)
router.post("/user/send_otp",otp_send)
router.post("/user/verify_otp",otp_verify)

module.exports = router;
