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

const { add_image, image_data,onboard_api,onboard_apiList } = require('../../controller/admin/products');

router.post("/add_image", upload.single('image'), add_image)
router.get('/front_images', image_data)


router.post("/add_onboard",upload.single('image'), onboard_api)
router.get('/onboard_api', onboard_apiList)


module.exports = router;
