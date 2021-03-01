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

const { specilist_image, specilist_image_data } = require('../controller/Catg_Drlist');

router.post("/specilist", upload.fields([{ name: 'Diabetilogy' }, { name: 'Pulmunology' }, { name: 'Neurology' }]), specilist_image)
router.get('/specilist_image_data', specilist_image_data)


module.exports = router;
