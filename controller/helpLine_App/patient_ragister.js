const Patient = require("../../model/helpLine_App/patient_ragister");
const Async = require('async')
const otp = require("../../otp")
const otpGenerator = require('otp-generator')



exports.patient_ragister =async (req, res) => {
    var { mobile, device_token, username } = req.body
    console.log(req.body, "anathor data")
    var result = await Patient.findOne({ phone_number: mobile })
    const OTP = otpGenerator.generate(4, { digits: true, upperCase: false, specialChars: false, alphabets: false });
    if (result) {
        var result = await Patient.updateOne({ phone_number: mobile }, { $set: { otp: OTP,device_token:device_token } })
        otp.send_otp(str, OTP).then((resp) => {
            res.json({
                code: 200,
                otp: `${OTP}`,
                msg: "OTP sent successfully"
            })
        }).catch((err) => {
            res.json({
                code: 400,
                otp: `${OTP}`,
                msg: "something went wrong"
            })
        })
    } else {
        var someuser = new Patient({
            phone_number: req.body.mobile,
            otp: OTP,
            device_token: device_token,
            username: username
        })
        someuser.save()
            .then((resp) => {
                res.json({
                    code: 200,
                    otp: `${OTP}`,
                    msg: "OTP sent successfully"
                })
            }).catch((err) => {
                res.json({
                    code: 400,
                    otp: `${OTP}`,
                    msg: "something went wrong"
                })
            })
    }
}


exports.patient_otp_verify = async (req, res) => {
    var result = await Patient.findOne({ phone_number: req.body.mobile })
    if (result) {
        console.log(req.body)
        if (result.otp == req.body.otp) {
            console.log("otp confirm")
            Patient.findOneAndUpdate({ phone_number: req.body.mobile }, { $set: { mobile_verify: "1", otp: '' } },
                (err, resp) => {
                    if (err) {
                        res.json({ code: 400, msg: 'mobile no not verfiy' })
                    }
                    else {
                        res.json({ code: 200, user: resp, msg: "already registered" })
                    }
                })
        } else {
            console.log("otp wrong")
            res.json({ code: 400, msg: 'wrong otp' })
        }
    }
    else {
        res.json({ code: 400, msg: 'data not found' })
    }
}
