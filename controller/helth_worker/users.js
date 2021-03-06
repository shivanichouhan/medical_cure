const bcrypt = require('bcryptjs')
const e = require('express')
const jwt = require('jsonwebtoken')
const User = require('../../model/helth_worker/users')
const cloud = require("../../cloudinary")
const fs = require('fs')
const _ = require('lodash')
const Async = require('async')
const otp = require("../../otp")
const otpGenerator = require('otp-generator')
// var Up = require("../../handler/multer")
// Up = Up.fields([{name:'clinic'},{name:'certificate'}])

async function hashPassword(password) {
    return await bcrypt.hash(password, 10)
}

async function validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword)
}





exports.clinic_otp = async (req, res) => {
    var str = req.body.mobile
    // var result = await User.findOne({ mobile: str })
    // if (result) {
    //     var result = await User.updateOne({ mobile: str }, { $set: { otp: OTP } })
    //     otp.send_otp(str, OTP).then((resp) => {
    //         res.json({
    //             code: 200,
    //             otp: `${OTP}`,
    //             msg: "OTP sent successfully"
    //         })
    //     }).catch((err) => {
    //         res.json({
    //             code: 400,
    //             otp: `${OTP}`,
    //             msg: "something went wrong"
    //         })
    //     })
    // } else {
    //     var someuser = new User({
    //         mobile: req.body.mobile,
    //         otp: OTP
    //     })
    //     someuser.save()
    //         .then((resp) => {
    //             res.json({
    //                 code: 200,
    //                 otp: `${OTP}`,
    //                 msg: "OTP sent successfully"
    //             })
    //         }).catch((err) => {
    //             res.json({
    //                 code: 400,
    //                 otp: `${OTP}`,
    //                 msg: "something went wrong"
    //             })
    //         })
    // }
    console.log(req.body)
    User.findOne({ _id: req.params.userId }).exec((err, resp) => {
        if (err) {
            res.json({ code: 400, msg: 'data not found' })
        }
        else {
            if (resp.register == "1") {
                const OTP = otpGenerator.generate(4, { digits: true, upperCase: false, specialChars: false, alphabets: false });
                otp.send_otp(str, OTP).then((resp) => {
                    console.log(req.params.userId)
                    User.findByIdAndUpdate(req.params.userId, { $set: { otp: OTP, mobile: str } }).then((dataUser) => {
                        res.json({ code: 200, msg: 'otp send successfully', otp: OTP })

                    }).catch((err) => {
                        res.json({ code: 400, msg: 'otp not set in user' })
                    })
                }).catch((err) => {
                    res.json({ code: 400, msg: 'otp not sent' })
                })

            }
            else {
                const OTP = otpGenerator.generate(4, { digits: true, upperCase: false, specialChars: false, alphabets: false });
                otp.send_otp(str, OTP).then((resp) => {
                    console.log(req.params.userId)
                    User.findByIdAndUpdate(req.params.userId, { $set: { otp: OTP, mobile: str } }).then((dataUser) => {
                        res.json({ code: 200, msg: 'otp send successfully', otp: OTP })

                    }).catch((err) => {
                        res.json({ code: 400, msg: 'otp not set in user' })
                    })
                }).catch((err) => {
                    res.json({ code: 400, msg: 'otp not sent' })
                })
            }
        }
    })

}

exports.clinic_otp_verify = async (req, res) => {
    const { firebase_token } = req.body
    var result = await User.findOne({ mobile: req.body.mobile })
    if (result) {
        console.log(req.body)
        if (result.otp == req.body.otp) {
            console.log("otp confirm")
            User.findOneAndUpdate({ mobile: req.body.mobile }, { $set: { mobile_verfiy: 1, otp: '', firebase_token: firebase_token } },
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
        // if (result.otp == req.body.otp) {
        //     var someuser = new User({
        //         mobile: req.body.mobile,
        //         mobile_verfiy: 1,
        //         login_type: "phone"

        //     })
        res.json({ code: 400, msg: 'data not found' })
        // } else {
        //     console.log("otp wrong")
        //     res.json({ code: 400, msg: 'wrong otp' })
        // }
    }
}

exports.otp_send = async (req, res) => {
    var str = req.body.forgetpass
    var patt1 = /^[0-9]*$/;
    if (str.match(patt1)) {
        User.findOne({ mobile: req.body.forgetpass })
            .exec((err, data) => {
                if (err || !data) {
                    res.json({ code: 400, error: 'this number does not exist' })
                }
                else {
                    const OTP = otpGenerator.generate(4, { digits: true, upperCase: false, specialChars: false, alphabets: false });
                    otp.send_otp(str, OTP).then((data) => {
                        console.log('run')
                        // res.send(data)
                        User.updateOne({ mobile: str }, { $set: { otp: OTP } }, (err, respdata) => {
                            if (err) {
                                res.json({ code: 400, msg: 'otp no is not add in doctor' })
                            }
                            else {
                                res.json({ code: 200, msg: "otp send successfully" })
                            }
                        })
                    }).catch((err) => {
                        res.json({ code: 400, msg: 'otp not sent' })
                    })
                }
            })
    }
    else {
        console.log('email is coming')
        console.log(str)
        var Email = await User.findOne({ email: str })
        console.log(Email)
        if (!Email) {
            res.json({ code: 400, msg: 'this email id not exist' })
        } else {
            console.log(Email.gmailId)
            if (Email.gmailId == undefined) {
                const OTP = otpGenerator.generate(4, { digits: true, upperCase: false, specialChars: false, alphabets: false });
                console.log(OTP, typeof OTP)
                User.updateOne({ email: str }, { $set: { otp: OTP } }, (err, respdata) => {
                    if (err) {
                        res.json({ code: 400, msg: 'otp not add in healthworker' })
                    }
                    else {
                        res.json({ code: 200, msg: "otp send successfully", otp: OTP })
                    }
                }).catch((err) => {
                    res.send(err)
                })
            }
            else {
                res.json({ code: 400, error: 'you are login gmail or facebook' })
            }

        }
    }
}

exports.otp_verify = (req, res) => {
    var str = req.body.type
    var patt1 = /^[0-9]*$/;
    if (str.match(patt1)) {
        User.findOne({ mobile: str })
            .exec((err, resp) => {
                if (err) {
                    res.json(err)
                }
                else {
                    if (resp.otp === req.body.otp) {
                        User.findOneAndUpdate({ mobile: str }, { $set: { otp: " " } }, (err, userUpdate) => {
                            if (err) {
                                res.json(err)
                            }
                            else {
                                res.json({ code: 200, health_worker_id: userUpdate._id })
                            }
                        })
                    }
                    else {
                        res.json({ code: 400, error: 'wrong otp' })
                    }
                }
            })
    }
    else {
        User.findOne({ email: str })
            .exec((err, resp) => {
                if (err) {
                    res.json(err)
                }
                else {
                    if (resp.otp === req.body.otp) {
                        User.findOneAndUpdate({ email: str }, { $set: { otp: " " } }, (err, userUpdate) => {
                            if (err) {
                                res.json(err)
                            }
                            else {
                                res.json({ code: 200, health_worker_id: userUpdate._id })
                            }
                        })
                    }
                    else {
                        res.json({ code: 400, error: 'wrong otp' })
                    }
                }
            })
    }
}

exports.updatePass = async (req, res) => {
    if (req.body.password === req.body.confirmPass) {
        const Password = await hashPassword(req.body.password)
        User.findByIdAndUpdate(req.body.health_worker_id, { $set: { password: Password } },
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

exports.normal_signup = async (req, res) => {
    // try {
    console.log(req.body)
    const { user_name, email, firebase_token, password, con_password } = req.body;
    // if (password == con_password) {
    const hashedPassword = await hashPassword(password)
    const data_check = await User.findOne({ email: email })
    if (!data_check) {
        const datas = new User({
            username: user_name,
            email: email,
            password: hashedPassword,
            firebase_token: firebase_token

        })
        datas.save()
            .then((resp) => {
                res.json({ code: 200, msg: resp })
            })

    } else {
        res.json({ code: 200, msg: "Email already exist" })
    }


};

exports.normal_signin = async (req, res) => {

    const { email, password, firebase_token } = req.body
    console.log(email, password, firebase_token)
    const user = await User.findOne({ email: email })
    console.log(user)
    if (!user) {
        res.json({
            code: 400,
            msg: 'not exist'
        })
    } else {
        console.log(user)
        const validPassword = await validatePassword(password, user.password)
        console.log(validPassword, '44')
        if (!validPassword) {
            res.json({ code: 400, msg: 'Password is not correct' })
        }
        else {
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
            console.log(token)
            const ss = await User.updateOne({ _id: user._id }, { $set: { bearer_token: token, firebase_token: firebase_token } })
            user.bearer_token = token
            res.json({ code: 200, msg: user })
        }
    }
}

exports.clinic_reg = async (req, res) => {
    if (req.files) {
        // if (req.files.certificate !=undefined) {
        var certificate = req.files.certificate

        // } if (req.files.clinic != undefined) {
        var clinic = req.files.clinic

        // }
    }

    const { username, email, mobile, status, health_worker_course, experience,
        state, city, pincode, address,
        dob, gender, blood_group, card_name, card_no,
        account_no, ifsc_code,
        phone, firebase_token

    } = req.body

    console.log(req.files)
    console.log("hjjjjjjjjjjj", req.body)
    const urlsF = []
    const URL = {}
    if (certificate) {
        const uploaderF = async (path) => await cloud.Certificate(path, 'Certificates')
        for (const fileF of certificate) {
            const { path } = fileF
            const newpathF = await uploaderF(path)
            urlsF.push(newpathF)
            fs.unlinkSync(path)
        }
        URL.certificate_img = urlsF
    }
    const urlsS = []
    if (clinic) {
        const uploaderS = async (path) => await cloud.Clinic(path, 'Clinics')
        for (const fileS of clinic) {

            const { path } = fileS
            const newpathS = await uploaderS(path)
            urlsS.push(newpathS)
            fs.unlinkSync(path)
        }
        URL.clinic_img = urlsS
    }
    // console.log(urlsF,"certificate", urlsS)

    URL.register = "1"


    const obj = {};
    if (username) {
        obj.username = username
    } if (email) {
        obj.email = email
    } if (mobile) {
        obj.mobile = mobile
    }
    if (firebase_token) {
        obj.firebase_token = firebase_token
    }

    if (status) {
        obj.status = status
    } if (health_worker_course) {
        obj.health_worker_course = health_worker_course
    } if (experience) {
        obj.experience = experience
    }
    if (state) {
        obj.state = state
    } if (city) {
        obj.city = city
    } if (pincode) {
        obj.pincode = pincode
    }
    if (address) {
        obj.address = address
    } if (dob) {
        obj.dob = dob
    } if (gender) {
        obj.gender = gender
    }
    if (blood_group) {
        obj.blood_group = blood_group
    } if (card_name) {
        obj.card_name = card_name
    }
    if (card_no) {
        obj.card_no = card_no
    }
    if (account_no) {
        obj.account_no = account_no
    } if (ifsc_code) {
        obj.ifsc_code = ifsc_code
    } if (phone) {
        obj.phone = phone
    }
    var detail = _.extend(obj, URL)
    console.log("details addedddddddddddd", URL);
    User.updateOne({ _id: req.params.userId }, detail, (err, data) => {
        if (err) {
            res.json({ code: 400, msg: 'health worker detail no add' })
        }
        else {
            res.json({ code: 200, msg: 'health worker add successfully' })
            console.log(data)
        }
    })
}

exports.edit_profile = (req, res) => {
    User.updateOne({ _id: req.params.userId }, req.body, (err, updteUser) => {
        if (err) {
            res.json({ code: 400, msg: 'health worker details not update' })
        }
        else {
            if (req.files.clinic) {
                console.log(req.files.clinic)
                for (row of req.files.clinic) {
                    var p = row.path
                }
                const path = p
                cloud.Clinic(path).then((resp) => {
                    fs.unlinkSync(path)
                    console.log(resp)
                    User.updateOne({ 'clinic_img.imgId': req.body.imgID }, { $set: { "clinic_img.$.url": resp.url, "clinic_img.$.imgId": resp.imgId } })
                        .then((resPatient) => {
                            res.json({ code: 200, msg: 'user details update with clinic image' })
                        }).catch((error) => {
                            res.json({ code: 400, msg: 'clinic image not update' })
                        })
                }).catch((err) => {
                    res.send({ code: 400, msg: 'image url not create' })
                })
            }

            else if (req.files.certificate) {
                console.log(req.files.certificate)
                for (row of req.files.certificate) {
                    var p = row.path
                }
                const path = p

                cloud.Certificate(path).then((resp) => {
                    fs.unlinkSync(path)
                    console.log(resp)
                    User.updateOne({ 'certificate_img.imgId': req.body.imgID }, { $set: { "certificate_img.$.url": resp.url, "certificate_img.$.imgId": resp.imgId } })
                        .then((resPatient) => {
                            res.json({ code: 200, msg: 'user details update with certificate image' })
                        }).catch((error) => {
                            res.json({ code: 400, msg: 'certificate image not update' })
                        })
                }).catch((err) => {
                    res.send({ code: 400, msg: 'image url not create' })
                })
            }
            else {
                res.json({ code: 200, msg: 'user details update successfully' })
            }

        }
    })
}

exports.gmail_signin = (req, res) => {
    const { email, gmailId, firebase_token, username, photo, login_type } = req.body
    console.log("shivani gmail data", req.body)
    if (login_type == "gmail") {
        User.findOne({ $or: [{ email: email }, { gmailId: gmailId }] })
            .then((resp) => {
                console.log(resp)
                if (resp) {
                    User.updateOne({ _id: resp._id }, { $set: { gmailId: gmailId, firebase_token: firebase_token } }, (err, userUpdate) => {
                        if (err) {
                            res.json(err)
                        }
                        else {

                            res.json({ code: 200, msg: resp })
                        }
                    })
                }
                else {
                    console.log(req.body)
                    var userinfo = new User({
                        email: req.body.email,
                        gmailId: req.body.gmailId,
                        username: username,
                        photo: photo,
                        firebase_token: firebase_token
                    })
                    var Token = jwt.sign({ _id: userinfo._id }, process.env.JWT_SECRET)
                    userinfo.bearer_token = Token
                    console.log(userinfo)

                    userinfo.save((err, Data) => {
                        if (err) {
                            res.send(err)
                        }
                        else {
                            res.send({ code: 200, msg: Data })
                        }
                    })
                }
            }).catch((error) => {
                res.json(error)
            })
    } else if (login_type == 'facebook') {
        User.findOne({ gmailId: gmailId })
            .then((resp) => {
                console.log(resp)
                if (resp) {
                    User.updateOne({ _id: resp._id }, { $set: { gmailId: gmailId, firebase_token: firebase_token } }, (err, userUpdate) => {
                        if (err) {
                            res.json(err)
                        }
                        else {

                            res.json({ code: 200, msg: resp })
                        }
                    })
                }
                else {
                    console.log(req.body)
                    var userinfo = new User({
                        email: req.body.email,
                        gmailId: req.body.gmailId,
                        username: username,
                        photo: photo,
                        firebase_token: firebase_token
                    })
                    var Token = jwt.sign({ _id: userinfo._id }, process.env.JWT_SECRET)
                    userinfo.bearer_token = Token
                    console.log(userinfo)

                    userinfo.save((err, Data) => {
                        if (err) {
                            res.send(err)
                        }
                        else {
                            res.send({ code: 200, msg: Data })
                        }
                    })
                }
            }).catch((error) => {
                res.json(error)
            })
    }
}

exports.edit_user_profile = (req, res) => {
    const { user_id } = req.body
    if (req.file) {
        const path = req.file.path
        cloud.edit_profile(path, 'profile').then((resp) => {
            console.log(resp)
            fs.unlinkSync(path)
            User.updateOne({ _id: user_id }, { $set: { photo: resp.url, imgId: resp.imgId } })
                .then((resPatient) => {
                    res.json({ code: 200, msg: "profile changed" })
                }).catch((error) => {
                    res.json(error)
                })
        }).catch((err) => {
            res.send(err)
        })
    }
    else {
        res.json({ code: 400, msg: 'image not selected' })
    }

}

exports.clinic_info = (req, res) => {
    User.find({ _id: req.params.userId })
        .exec((err, userInfo) => {
            if (err || !userInfo) {
                res.json({ code: 400, msg: 'health worker profile not found' })
            }
            else {
                res.json({ code: 200, msg: userInfo })
            }
        })
}

