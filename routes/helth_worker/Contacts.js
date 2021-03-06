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
    else cb(null, file.fieldname + '-' + Date.now( ) + file.originalname)
  }
})
var upload = multer({ storage: storage })

const {doctorContact_data,Contact_data,HelthworkerContact_data}=require('../../controller/helth_worker/Contacts_controller');

router.post("/Contacts_data",Contact_data)
router.post("/helthworker/contact_us",HelthworkerContact_data)
router.post("/doctor/contact_us",doctorContact_data)

module.exports = router;
