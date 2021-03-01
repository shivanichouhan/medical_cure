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

const {signup}=require('../controller/Admin');
const {signin}=require('../controller/Admin');

router.post("/admin_signup",signup)
router.post("/admin_signin",signin)




module.exports = router;
