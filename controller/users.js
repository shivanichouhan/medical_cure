const bcrypt = require('bcryptjs')
const e = require('express')
const jwt = require('jsonwebtoken')
const User = require('../model/users')
const cloud = require("../cloudinary")
const fs = require('fs')
const _ = require('lodash')
const Async = require('async')

// const SendOtp = require('sendotp');
// const sendOtp = new SendOtp("4603359F95325E",'Otp for your order is {{otp}}, please do not share it with anybody');

async function hashPassword(password) {
    return await bcrypt.hash(password, 10)
}

async function validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword)
}
const cloudenary = require('cloudinary').v2

cloudenary.config({
    cloud_name: 'dph53engs',
    api_key: '844719118241756',
    api_secret: '6IPsNfYyr9i43_qOhNPvLTh7Tg4'
})

exports.otp_send = (req, res) => {
    sendOtp.send(req.body.Mobile, "VIRALL", function (error, data) {
        if (error) {
            res.send(error)
        }
        else {
            res.send(data)
        }
    });
}

// exports.otp_send =(req,res)=>{
//     var number = req.body.Mobile
//     console.log(number)
//     sendOtp.send(number,"VIRALL", function (error, data) {
//         res.send(data);
//       });
// User.findOne({Mobile:req.body.Mobile})
// .then((resp)=>{
//     console.log(resp)
//     if(resp.otp == ''){
//         console.log('otp blank')
//         sendOtp.send(req.body.Mobile,"",(error, data)=>{
//             res.send(data)
//             // User.updateOne({_id:resp._id},{$set:{otp:data.otp}})
//             // .then((otp)=>{
//             //    res.json({code:200,msg:'otp send successfully',Data:Data})     
//             // })
//             // .catch((error)=>{
//             //     console.log(error)
//             //     res.json({code:400,msg:'otp is not add in user'})
//             // })
//         });
//     }
//     else{
//         console.log('otp blank not')
//         // sendOtp.retry(resp.Mobile, true,(error, data)=>{
//         //     res.json({code:200,msg:'otp resend successfully',Data:data}) 
//         // });
//     }

// }).catch((error)=>{
//     res.json({code:400,msg:'mobile no is not register'})
// })
// }

exports.otp_verify = (req, res) => {
    User.find({ otp: req.body.otp })
        .then((resp) => {
            sendOtp.verify(resp.Mobile, resp.otp, function (error, data) {
                console.log(data); // data object with keys 'message' and 'type'
                if (data.type == 'success') {
                    res.json({ code: 200, msg: 'otp verify successfully' })
                }
                if (data.type == 'error') {
                    res.json({ code: 400, msg: 'otp is not verify' })
                }
            });
        }).catch((err) => {
            res.json({ code: 400, msg: 'wrong otp' })
        })
}

exports.normal_signup = async (req, res) => {
    // try {
    const { user_name, email, password, con_password } = req.body;
    // if (password == con_password) {
    const hashedPassword = await hashPassword(password)
    const data_check = await User.findOne({ email: email })
    if (!data_check) {
        const datas = new User({
            username: user_name,
            email: email,
            password: hashedPassword

        })
        datas.save()
            .then((resp) => {
                res.json({ code: 200, msg: resp })
            })

    } else {
        res.json({ code: 200, msg: "Email already exist" })
    }

    // } else {
    //     res.json({ code: 200, msg: "confirm password is wrong" })
    // }
    // }catch(err){
    //     res.send(err)
    // }

};


exports.normal_signin = async (req, res) => {
    const { email, password } = req.body
    console.log(email, password)
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
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
        console.log(token)
        const ss = await User.updateOne({ bearer_token: token })
        res.cookie('token', token, { expire: new Date() + 9999 })
        res.json({ code: 200, msg: user })
    }

}

// expo

exports.clinic_reg = async (req, res) => {
    var certificate = req.files.certificate
    var clinic = req.files.clinic

    const uploaderF = async (path) => await cloud.Certificate(path, 'Certificates')
    const uploaderS = async (path) => await cloud.Clinic(path, 'Clinics')

    const urlsF = []
    for (const fileF of certificate) {
        const { path } = fileF
        const newpathF = await uploaderF(path)
        urlsF.push(newpathF)
        fs.unlinkSync(path)
    }

    const urlsS = []
    for (const fileS of clinic) {
        const { path } = fileS
        const newpathS = await uploaderS(path)
        urlsS.push(newpathS)
        fs.unlinkSync(path)
    }

    var URL = {
        certificate_img: urlsF,
        clinic_img: urlsS
    }

    var detail = _.extend(req.body, URL)
    console.log(detail)
    User.updateOne({ _id: req.params.userId }, detail, (err, data) => {
        if (err) {
            res.json(err)
        }
        else {
            res.json(data)
        }
    })

}

exports.edit_profile = (req, res) => {
    User.updateOne({ _id: req.params.userId }, req.body, (err, updteUser) => {
        if (err) {
            res.json(err)
        }
        else {
            if (req.files) {
                console.log(req.files.clinic)
                for (row of req.files.clinic) {
                    var p = row.path
                }
                const path = p
                cloud.uploads(path, 'clinic').then((resp) => {
                    fs.unlinkSync(path)
                    console.log(resp)
                    User.updateOne({ 'clinic_img.imgId': req.params.imgID }, { $set: { "clinic_img.$.url": resp.url, "clinic_img.$.id": resp.id } })
                        .then((resPatient) => {
                            res.json({ resp: resPatient, msg: 'user details update with image' })
                        }).catch((error) => {
                            res.json(error)
                        })
                }).catch((err) => {
                    res.send(err)
                })
            }
            else {
                res.json({ code: 200, msg: 'user details update successfully' })
            }
        }
    })
}

// exports.f

exports.gmail_signin = (req, res) => {
    const { email, gmailId, username, photo, login_type } = req.body
    console.log("shivani gmail data", req.body)
    if (login_type == "gmail") {
        User.findOne({ $or: [{ email: email }, { gmailId: gmailId }] })
            .then((resp) => {
                console.log(resp)
                if (resp) {
                    User.updateOne({ _id: resp._id }, { $set: { gmailId: gmailId } }, (err, userUpdate) => {
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
                        photo: photo
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
                    User.updateOne({ _id: resp._id }, { $set: { gmailId: gmailId } }, (err, userUpdate) => {
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
                        photo: photo
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
            User.updateOne({ _id: user_id }, { $set: { photo:resp.url ,imgId:resp.imgId}})
                .then((resPatient) => {
                    res.json({ code:200, msg:"profile changed" })
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
            if (err) {
                res.json(err)
            }
            else {
                res.json(userInfo)
            }
        })
}