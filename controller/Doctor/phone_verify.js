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
    const user_ids = req.params.user_id
    Doctor_num.findOne({ _id: user_ids })
        .exec((err, data) => {
            if (err) {
                console.log(err)
                res.json({ code: 400, error: 'data not found' })
            }
            else {
                console.log(data)
                if(data.register == "1"){
                    res.json({ code: 400, error: 'doctor already register' })  
                }
                else{
                    const OTP = otpGenerator.generate(6, { digits: true, upperCase: false, specialChars: false, alphabets: false });
                    otp.send_otp(req.body.mobile_number, OTP).then((data) => {
                    Doctor_num.findByIdAndUpdate({ _id: user_ids }, { $set: { otp: OTP, mobile_number: req.body.mobile_number } }, (err, respdata) => {
                        res.json({code:200,msg:{_id:respdata._id,otp:OTP}})
                    })
                }).catch((err) => {
                    console.log(err,"error hai hmari")
                    res.json({code:400,msg:"something went wrong"})
                    console.log('send otp error',err)
                })
                }
                
            }
        })
}

exports.number_verify = (req, res) => {
    const { mobile_number, otp } = req.body
    console.log("")
    Doctor_num.findOne({ mobile_number: mobile_number })
        .then((resp) => {
            console.log(resp)
            if (resp.otp == otp) {
                Doctor_num.findOneAndUpdate({ mobile_number: req.body.mobile_number }, { $set: { otp: " ", otp_verify: 1 } }, (err, doctorUpdate) => {
                    if (err) {
                        res.json(err)
                    }
                    else {
                        res.json({ code: 200, doctor_id: doctorUpdate._id })
                    }
                })
            }
            else {
                res.json({ code: 400, error: 'wrong otp' })
            }

        })
}




// curedev/.pm2/logs/app-out.log last 15 lines:
// 0|app      |   password: '123456789',
// 0|app      |   user_name: 'Shivani Chouhan',
// 0|app      |   email: 'shina12@gmail.com'
// 0|app      | }