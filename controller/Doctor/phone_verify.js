const Doctor_num = require('../../model/Doctor/doctor_regis')
const otp = require("../../otp")
const otpGenerator = require('otp-generator')

exports.phone_varify = async (req, res) => {
    const { mobile_number } = req.body

    const data_find = await Doctor_num.findOne({ mobile_number: mobile_number })
    if (data_find) {
        res.send('this is already exist')
    } else {
        const user_details = {
            mobile_number: mobile_number
        }
        user_details
        Doctor_num.updateOne({ _id: req.params.user_id }, { $set: user_details })
            .then(() => {
                res.json({ Save_Doctor_details: user_details })
            })
            .catch(e => {
                res.send(e)
            })
    }
}


exports.sent_Otp = (req, res) => {
    Doctor_num.findOne({ mobile_number: req.body.mobile_number })
        .exec((err, data) => {
            if (err || !data) {
                res.json({ code: 400, error: 'this number does not exist' })
            }
            else {
                const OTP = otpGenerator.generate(6, { digits: true, upperCase: false, specialChars: false, alphabets: false });
                otp.send_otp(req.body.mobile_number, OTP).then((data) => {
                    res.send(data)
                    Doctor_num.updateOne({ mobile_number: req.body.mobile_number }, { $set: { otp: OTP } }, (err, respdata) => {
                    })
                }).catch((err) => {
                    res.send(err)
                })
            }
        })
}

exports.number_verify = (req, res) => {
    const { mobile_number, otp } = req.body
    console.log("fyufuugg")
    Doctor_num.findOne({ mobile_number: mobile_number })
        .then((resp) => {
            console.log(resp)
            if (resp.otp == otp) {
                Doctor_num.findOneAndUpdate({ mobile_number: req.body.mobile_number }, { $set: { otp: " ", otp_verify : 1 } }, (err, doctorUpdate) => {
                    if (err) {
                        res.json(err)
                    }
                    else {
                        res.json({ code: 200, Number_Verification_Successful_regis_id: doctorUpdate._id })
                    }
                })
            }
            else {
                res.json({ code: 400, error: 'wrong otp' })
            }

        })
}