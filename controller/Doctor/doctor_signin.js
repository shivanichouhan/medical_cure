const doc = require("../../model/Doctor/doctor_regis")
const subCategories = require("../../model/Doctor/doctor_subcategory")
const patient_data = require("../../model/helth_worker/patient_registration")
const availabiltyHour = require("../../model/Doctor/availability_hour")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
var otpGenerator = require('otp-generator')
const otp = require("../../otp")
const _ = require('lodash')
const cloud = require("../../cloudinary")
const fs = require('fs')


async function hashPassword(password) {
    return await bcrypt.hash(password, 10)
};

async function validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword)
};

exports.doctor_info = (req, res) => {
    doc.find({ _id: req.params.docId })
        .exec((err, resp) => {
            if (err) {
                res.json({ code: 400, msg: 'doctor info not find' })
            }
            else {
                res.json({ code: 200, msg: resp })
            }
        })
}



exports.reg_from = async (req, res) => {
    var data = _.extend(req.body, { register: "1" })
    console.log(data)
    doc.findByIdAndUpdate(req.params.docId, { $set: data }).exec(async (err, resp) => {
        if (err) {
            res.json({ code: 400, msg: 'doctor details not save' })
            console.log(err, 'doc_detail')
        }
        else {
            if (req.files) {
                const doc_cer = req.files.certificate_Img
                const lic_front = req.files.License_img_front_side
                const lic_back = req.files.License_img_back_side
                //    const doc_pass_cer = req.files.passing_year_certificate
                const identity_front = req.files.identity_front_side_img
                const identity_back = req.files.identity_back_side_img

                const docreg = async (path) => await cloud.doctor_reg(path)
                const front_lic = async (path) => await cloud.licence_front(path)
                const back_lic = async (path) => await cloud.licence_back(path)
                //    const pass_certificate = async (path)=> await cloud.doc_pass(path)
                const identiy_front = async (path) => await cloud.iden_front(path)
                const identiy_back = async (path) => await cloud.iden_back(path)

                const p1 = doc_cer[0].path
                const p2 = lic_front[0].path
                const p3 = lic_back[0].path
                //    const p4 =doc_pass_cer[0].path
                const p5 = identity_front[0].path
                const p6 = identity_back[0].path

                const url_cer = await docreg(p1)
                const lice_front = await front_lic(p2)
                const lice_back = await back_lic(p3)
                //    const url_pass = await pass_certificate(p4)
                const iden_front = await identiy_front(p5)
                const iden_back = await identiy_back(p6)

                console.log(lice_front, lice_back, iden_front, iden_back)
                fs.unlinkSync(p1)
                fs.unlinkSync(p2)
                fs.unlinkSync(p3)
                //    fs.unlinkSync(p4)
                fs.unlinkSync(p5)
                fs.unlinkSync(p6)

                doc.findByIdAndUpdate(resp._id, {
                    $push: {
                        certificate_Img: url_cer,
                        License_img_front_side: lice_front,
                        License_img_back_side: lice_back,
                        identity_front_side_img: iden_front,
                        identity_back_side_img: iden_back,
                    }, $set: { register: "1" }
                }).exec(async (err, resDoc) => {
                    if (err) {
                        res.send({ code: 400, msg: 'images not add in doctor' })
                        console.log(err, 'doc_img')
                    } else {
                        res.send({ code: 200, msg: 'success with img' })
                    }
                })
            }
            else {
                res.send({ code: 200, msg: 'success' })
            }
        }
    })
}

exports.doctor_reg = async (req, res) => {
    const OTP = otpGenerator.generate(2, { digits: true, upperCase: false, specialChars: false, alphabets: false });
    console.log(req.body)

    const { user_name, email, password, firebase_token ,deviceName} = req.body;
    console.log(email)
    const hashedPassword = await hashPassword(password)
    const data_check = await doc.findOne({ email: email })

    console.log(data_check)
    if (!data_check) {
        const datas = new doc({
            username: user_name,
            email: email,
            password: hashedPassword,
            firebase_token: firebase_token,
            deviceName:deviceName

        })
        datas.user_id = datas._id
        datas.dumy_userName = '@' + user_name + OTP
        datas.save()
            .then((resp) => {
                res.json({ code: 200, msg: resp })
            })

    } else {
        res.json({ code: 400, msg: "Email already exist" })
    }
}

exports.doctorLogin = async (req, res) => {
    var { email, password } = req.body
    console.log(req.body)
    const user = await doc.findOne({ email: email })
    if (!user) {
        res.json({
            code: 400,
            msg: 'User with that email does not exist. Please signup'
        })
    }
    else {
        const validPassword = await validatePassword(password, user.password)
        console.log(validPassword, '44')
        if (!validPassword) {
            res.json({ code: 400, msg: 'Password is not correct' })
        }
        else {
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
            console.log(token)
            const Doc = await doc.updateOne({ _id: user._id }, { $set: { firebase_token: req.body.firebase_token } })
            if (Doc) {
                return res.json({
                    code: 200, msg: {
                        firebase_token: user.firebase_token, bearer_token: token,
                        username: user.username,
                        email: user.email, online_status: user.online_status,
                        dumy_userName: user.dumy_userName, _id: user._id,
                        register: user.register,
                        deviceName: user.deviceName,
                        profile_pic:user.profile_pic

                    }
                });
            }
            else {
                res.json({ code: 400, msg: 'firebase token not update' })
            }
        }
    }
}

exports.log_social = async (req, res) => {
    console.log(req.body)
    const OTP = otpGenerator.generate(2, { digits: true, upperCase: false, specialChars: false, alphabets: false });
    const { email, gmailId, username, profile_pic, login_type, deviceName } = req.body
    console.log("shivani gmail data", req.body)
    if (login_type == "gmail") {
        doc.findOne({ $or: [{ email: email }, { gmailId: gmailId }] }, { online_status: 1, _id: 1, deviceName: 1, register: 1, bearer_token: 1, email: 1, profile_pic, username: 1, login_type: 1, firebase_token: 1 })
            .then(async (resp) => {
                if (resp) {
                    var fire_token = await doc.updateOne({ _id: resp._id }, { $set: { firebase_token: req.body.firebase_token, profile_pic: profile_pic } })
                    if (fire_token) {
                        const token = jwt.sign({ _id: resp._id }, process.env.JWT_SECRET)
                        var result = _.extend(resp, { bearer_token: token })
                        var result1 = _.extend(result, { firebase_token: req.body.firebase_token })


                        res.json({ code: 200, msg: result1 })
                    }
                    else {
                        res.json({ code: 400, msg: 'fire_base token not update' })
                    }
                }
                else {
                    console.log(req.body)
                    var userinfo = new doc({
                        email: req.body.email,
                        gmailId: req.body.gmailId,
                        username: username,
                        firebase_token: req.body.firebase_token,
                        profile_pic: req.body.profile_pic,
                        deviceName: deviceName
                    })
                    var Token = jwt.sign({ _id: userinfo._id }, process.env.JWT_SECRET)
                    userinfo.bearer_token = Token
                    userinfo.dumy_userName = '@' + username + OTP
                    userinfo.save(async (err, Data) => {
                        if (err) {
                            res.send(err)
                        }
                        else {
                            const DataDoctor = await doc.findOne({ _id: Data._id }, { online_status: 1, _id: 1, register: 1, bearer_token: 1, email: 1, deviceName: 1, profile_pic, username: 1, login_type: 1, firebase_token: 1 })

                            res.send({ code: 200, msg: DataDoctor })
                        }
                    })
                }
            }).catch((error) => {
                res.json({ code: 400, msg: 'data not come' })
            })
    } else if (login_type == 'facebook') {
        doc.findOne({ $or: [{ email: email }, { online_status: 1, gmailId: gmailId }] }, { _id: 1, deviceName: 1, register: 1, bearer_token: 1, profile_pic, username: 1, login_type: 1, firebase_token: 1 })
            .then(async (resp) => {
                console.log(resp)
                if (resp) {
                    var firebase_token = await doc.updateOne({ _id: resp._id }, { $set: { deviceName: deviceName, firebase_token: req.body.firebase_token, profile_pic: profile_pic } })
                    if (firebase_token) {
                        const token = jwt.sign({ _id: resp._id }, process.env.JWT_SECRET)
                        var result = _.extend(resp, { bearer_token: token })
                        var result1 = _.extend(result, { firebase_token: req.body.firebase_token })

                        res.json({ code: 200, msg: result1 })
                    }
                    else {
                        res.json({ code: 400, msg: 'fire_base token not update' })
                    }
                }
                else {
                    console.log(req.body)
                    var userinfo = new doc({
                        email: req.body.email,
                        gmailId: req.body.gmailId,
                        username: username,
                        firebase_token: req.body.firebase_token,
                        profile_pic: req.body.profile_pic,
                        deviceName: deviceName
                    })
                    var Token = jwt.sign({ _id: userinfo._id }, process.env.JWT_SECRET)
                    userinfo.bearer_token = Token
                    userinfo.dumy_userName = '@' + username + OTP
                    // console.log(userinfo)
                    userinfo.save(async (err, Data) => {
                        if (err) {
                            res.send(err)
                        }
                        else {
                            const DataDoctor = await doc.findOne({ _id: Data._id }, { online_status: 1, _id: 1, deviceName: 1, register: 1, bearer_token: 1, email: 1, profile_pic, username: 1, login_type: 1, firebase_token: 1 })
                            res.send({ code: 200, msg: DataDoctor })
                        }
                    })
                }
            }).catch((error) => {
                res.json({ code: 400, msg: 'data not come' })
            })
    }
}

exports.otpSend = async (req, res) => {
    var str = req.body.type
    console.log(str)
    var patt1 = /^[0-9]*$/;
    if (str.match(patt1)) {
        doc.findOne({ mobile_number: str })
            .exec((err, data) => {
                if (err || !data) {
                    res.json({ code: 400, error: 'this number does not exist' })
                }
                else {
                    const OTP = otpGenerator.generate(4, { digits: true, upperCase: false, specialChars: false, alphabets: false });
                    console.log(OTP, typeof OTP)
                    otp.send_otp(str, OTP).then((data) => {
                        doc.findOneAndUpdate({ mobile_number: str }, { $set: { otp: OTP } }, (err, respdata) => {
                            if (err) {
                                res.json({ code: 400, msg: 'otp not update in doctor', docId: respdata._id })
                            }
                            else {
                                res.json({ code: 200, msg: "otp send successfully" })
                            }
                        })
                    }).catch((err) => {
                        res.send({ code: 400, msg: 'otp not sent' })
                    })
                }
            })
    }
    else {
        console.log('email is coming')
        var Email = await doc.findOne({ email: str })
        console.log(Email)
        if (!Email) {
            res.json({ code: 400, msg: 'this email id not exist' })
        } else {
            console.log(Email.gmailId)
            if (Email.gmailId == undefined) {
                const OTP = otpGenerator.generate(4, { digits: true, upperCase: false, specialChars: false, alphabets: false });
                otp.forget_email_otp(str, OTP).then((res_data) => {
                    doc.findOneAndUpdate({ email: str }, { $set: { otp: OTP } }, (err, respdata) => {
                        if (err) {
                            res.json({ code: 400, msg: 'otp not add in doctor' })
                        }
                        else {
                            res.json({ code: 200, msg: "otp send successfully", otp: OTP, docId: respdata._id })
                        }
                    })
                }).catch((error) => {
                    console.log(error)
                    res.json({ code: 400, msg: 'otp not sent in email' })
                })
            }
            else {
                res.json({ code: 400, error: 'you are login gmail or facebook' })
            }
        }
    }
}

exports.otpVerify = (req, res) => {
    var str = req.body.type
    doc.findOne({ _id: req.body.docId })
        .exec((err, resp) => {
            if (err || !resp) {
                console.log(err)
                res.json({ code: 400, msg: 'this doctor not found' })
            }
            else {
                if (resp.otp === req.body.otp) {
                    doc.findOneAndUpdate({ _id: req.body.docId }, { $set: { otp: " " } }, (err, docUpdate) => {
                        if (err) {
                            res.json(err)
                        }
                        else {
                            res.json({ code: 200, doctor_id: docUpdate._id, msg: 'otp verfiy successfully' })
                        }
                    })
                }
                else {
                    res.json({ code: 400, error: 'wrong otp' })
                }
            }
        })
}

exports.doctorOnline_status = async (req, res) => {
    const { doctorId, type } = req.body;
    // availabiltyHour
    var currentDate = new Date()
    let year = currentDate.getFullYear()
    let month = currentDate.getMonth() + 1 //because January starts with 0
    let day = currentDate.getDate()
    const dataresp = await availabiltyHour.aggregate([
        {
            "$match": {
                $and: [
                    {
                        doctor_id: doctorId
                    },
                    {
                        "year": currentDate.getFullYear(),
                        "month": currentDate.getMonth() + 1, //because January starts with 0
                        "day": currentDate.getDate()
                    }
                ]
            }
        }
    ]
    )
    console.log(dataresp, "perday response")

    if (type == "1" || type == 1) {
        if (dataresp.length == 0) {
            const avail = new availabiltyHour({
                year: year,
                month: month,
                day: day,
                availability_hour: 0,
                OnlineTime: currentDate,
                doctor_id: doctorId,
                switch: "on"
            })
            await avail.save()
        } else {
            const avails = availabiltyHour.updateOne({ doctor_id: doctorId }, {
                $set: {
                    OnlineTime: currentDate
                }
            })
            console.log("already add this day")
        }
        doc.updateOne({ _id: doctorId }, { $set: { online_status: type } })
            .then((resp) => {
                res.json({ code: 200, msg: "doctor status change successfully",online_status:"1" })
            }).catch((err) => {
                res.json({ code: 400, msg: "something went wrong" })
            })
    } else if (type == "0" || type == 0) {
        if (dataresp.length != 0) {
            const hours = dataresp[0]
            const details = await availabiltyHour.aggregate([
                {
                    $match: {
                        $and: [
                            {
                                _id: hours._id,
                            }
                        ]
                    }
                },
                {
                    $project: {
                        availability_hour: 1,
                        OnlineTime: 1,
                        duration: { $divide: [{ $subtract: [currentDate, "$OnlineTime"] }, 3600000] }
                    }
                }
            ])
            const details1 = details[0]
            const hours_data = hours.availability_hour + details1.duration
            const update_details = await availabiltyHour.updateOne({ _id: hours._id }, { $set: { availability_hour: hours_data, OnlineTime: currentDate } })
            console.log(hours_data, details, "jjjjjjjj")

        } else {
            console.log("not have dataaaaaaa")
        }
        doc.updateOne({ _id: doctorId }, { $set: { online_status: type } })
            .then((resp) => {
                res.json({
                    code: 200, msg:
                        "doctor status change successfully",
                        online_status:"0"
                })
            }).catch((err) => {
                console.log(err)
                res.json({ code: 400, msg: "something went wrong" })

            })
    } else {
        res.json({ code: 400, msg: "didn't give any online type" })
    }
}

exports.passupdate = async (req, res) => {
    console.log(req.body.password, req.body.confirmPass)
    if (req.body.password === req.body.confirmPass) {
        const Password = await hashPassword(req.body.password)

        doc.findByIdAndUpdate(req.body.doctor_id, { $set: { password: Password } },
            (err, passupdate) => {
                if (err) {
                    res.json({ code: 400, error: 'password does not update' })
                }
                else {
                    res.json({ code: 200, msg: 'password update successfully' })
                }
            })
    }
    else {
        res.json({ code: 400, error: 'password does not match' })
    }
}

exports.edit_profile_pic = async (req, res) => {
    console.log(req.file, req.body)
    if (req.file) {
        const { path } = req.file
        cloud.doctor_profile_pic(path).then(async (resp) => {
            fs.unlinkSync(path)
            var docProfile = await doc.updateOne({ _id: req.body.docId }, { $set: { profile_pic: resp.url } })
            if (docProfile) {
                res.json({ code: 200, msg: 'doctor profile pic update successfully' })
            }
            else {
                res.json({ code: 400, msg: 'doctor profile pic not update' })
            }
        }).catch((error) => {
            res.json({ code: 400, msg: 'img url not create' })
        })
    } else {
        res.json({ code: 400, msg: 'profile pic not come' })
    }

}


exports.ongoindConsultApi =async(req,res)=>{
    const { doctor_id } = req.body
    console.log(req.body)
    const arr = []
    patient_data.find({ $and: [{ status: "ongoing", doctor_id: doctor_id }] })
        .exec(async (err, List) => {
            if (err) {
                res.json({ code: 400, msg: 'patient list not found' })
            }
            else {
                await Promise.all(List.map(async (items) => {
                    console.log(items)
                    const obj = {}
                    const helth_workerdata = await helth_workers.findOne({ _id: items.health_worker_id })
                    const docter_data = await doc.findOne({ _id: items.doctor_id })
                    obj.helthwork_username = helth_workerdata.username;
                    obj.health_worker_id = helth_workerdata._id
                    obj.patient_id = items._id
                    obj.patient_name = items.patient_name
                    obj.status = items.status
                    obj.createdAt = items.createdAt
                    obj.patient_img = items.patient_img
                    obj.mobile = items.mobile,
                        // obj.disease = "High Blood Sugar"
                    obj.address = " "
                    obj.doctor_id = docter_data._id
                    obj.doctor_name = docter_data.username
                    obj.doctor_pic = docter_data.profile_pic
                    obj.disease = items.disease
                    obj.disease_id = items.disease_id
                    arr.push(obj)
                })).then((response) => {
                })
                res.json({ code: 200, msg: arr })
            }
        })
}
