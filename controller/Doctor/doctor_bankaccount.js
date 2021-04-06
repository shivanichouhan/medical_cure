const Bankaccount = require('../../model/Doctor/doctor_regis')
const otp = require("../../otp")
const otpGenerator = require('otp-generator')

exports.doctor_bank = async (req, res) => {
    const {

        select_bank,
        Account_No,
        IFSC_Code,
        Phone_Number,
        Account_holder_name
    } = req.body

    const data_find = await Bankaccount.findOne({ Phone_Number: Phone_Number })

    if (data_find) {
        res.send('this is already exist')
    } else {
        const account_details = {
            select_bank: select_bank,
            Account_No: Account_No,
            IFSC_Code: IFSC_Code,
            Phone_Number: Phone_Number,
            Account_holder_name: Account_holder_name
        }
        account_details
        Bankaccount.updateOne({ _id: req.params.user_id }, { $set: account_details })
            .then(() => {
                res.json({ Save_account_details: account_details })
            })
            .catch(e => {
                res.send(e)
            })
    }
}


exports.send_Otp = (req, res) => {
    Bankaccount.findOne({ Phone_Number: req.body.Phone_Number })
        .exec((err, data) => {
            if (err || !data) {
                res.json({ code: 400, error: 'this number does not exist' })
            }
            else {
                const OTP = otpGenerator.generate(6, { digits: true, upperCase: false, specialChars: false, alphabets: false });
                otp.send_otp(req.body.Phone_Number, OTP).then((data) => {
                    res.send(data)
                    Bankaccount.updateOne({ Phone_Number: req.body.Phone_Number }, { $set: { otp: OTP } }, (err, respdata) => {
                        /*  if (err) {
                              res.json(err)
                          }
                          else {
                              res.json({ code: 200, msg: "otp send successfully" })
                          }*/
                    })
                }).catch((err) => {
                    res.send(err)
                })
            }
        })
}

exports.account_verify_by_developer = (req, res) => {
    const { Phone_Number, otp } = req.body
    console.log("fyufuugg")
    Bankaccount.findOne({ Phone_Number: Phone_Number })
        .then((resp) => {
            console.log(resp)
            if (resp.otp == otp) {
                Bankaccount.findOneAndUpdate({ Phone_Number: req.body.Phone_Number }, { $set: { otp: " " } }, (err, bankaccountUpdate) => {
                    if (err) {
                        res.json(err)
                    }
                    else {
                        res.json({ code: 200, Account_Verification_Successful_regis_id: bankaccountUpdate._id })
                    }
                })
            }
            else {
                res.json({ code: 400, error: 'wrong otp' })
            }

        })
}