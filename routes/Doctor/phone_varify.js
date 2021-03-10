var express = require('express');
var router = express.Router();
const{phone_varify,sent_Otp,  number_verify } = require("../../controller/Doctor/phone_verify")
router.put("/phone_varify/:user_id",phone_varify)
router.put("/sent_OTP/:user_id",sent_Otp)
router.put("/verify_number/:user_id",number_verify)



module.exports = router;