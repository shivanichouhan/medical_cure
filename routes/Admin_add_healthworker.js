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

const { Add_Health_Worker } = require('../controller/Admin_Add_Healthworker');
router.post("/Health_Worker",upload.fields([{name:'Certificate'},{name:'Clinic'}]),Add_Health_Worker)
//router.post("/Health_Worker",upload.ar('Certificate'), Add_Health_Worker)

module.exports = router;
