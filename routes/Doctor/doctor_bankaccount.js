var express = require('express');
var router = express.Router();
const{ doctor_bank, send_Otp, account_verify_by_developer } = require("../../controller/Doctor/doctor_bankaccount")
router.put("/doctor_bankAccount/:user_id",doctor_bank)
router.put("/bank_account/send_OTP/:user_id",send_Otp)
router.put("/bank_account/verify_phonenumbers/:user_id",account_verify_by_developer)




module.exports = router;