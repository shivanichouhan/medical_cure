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

async function hashPassword(password) {
    return await bcrypt.hash(password, 10)
}

async function validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword)
}

exports.otp_send =(req,res)=>{
    var str = req.body.forgetpass  
    var patt1 = /^[0-9]*$/;
    
    if(str.match(patt1)){
        console.log('number come')
        User.findOne({mobile:req.body.forgetpass}) 
        .exec((err,data)=>{
        if(err || !data){
          res.json({code:400, error:'this number does not exist'})  
        }
        else{
        const OTP =  otpGenerator.generate(4, {digits: true, upperCase: false, specialChars: false,alphabets:false});
        otp.send_otp(str,OTP).then((data)=>{
        User.updateOne({mobile:str},{$set:{otp:OTP}},(err,respdata)=>{
            if(err){
                res.json(err)
            }
            else{
                res.json({code:200,msg:"otp send successfully"})
            }
        })
       }).catch((err)=>{
        res.send(err)
      })
    }
  }) 
    }
    else{
        console.log('email is coming')
}
}

exports.otp_verify =(req,res)=>{
    User.findOne({mobile:req.body.mobile})
    .exec((err,resp)=>{
        if(err){
            res.json(err)
        }
       else{
            if(resp.otp === req.body.otp){
                User.findOneAndUpdate({mobile:req.body.mobile},{$set:{otp:" "}},(err,userUpdate)=>{
                    if(err){
                        res.json(err)
                    }
                    else{
                        res.json({code:200,health_worker_id:userUpdate._id})
                    }   
                })
            }
            else{
                res.json({code:400 ,error:'wrong otp'})
            }
       } 
    })
}

exports.updatePass= async(req,res)=>{
    if(req.body.password === req.body.confirmPass){
        const Password = await hashPassword(req.body.password)
        User.findByIdAndUpdate(req.body.health_worker_id,{$set:{password:Password}},
        (err,passupdate)=>{
           if(err){
               res.json({code:400, error:'password does not update'})
           }
           else{
               res.json({code:200, msg:'password update successfully'})
           }
       })
    }
    else{
        res.json({code:400,error:'password does not match'})
    }
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
        else{
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
        console.log(token)
        const ss = await User.updateOne({ bearer_token: token })
        res.cookie('token', token, { expire: new Date() + 9999 })
        res.json({ code: 200, msg: user })
        }
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
        else{
            if(req.files.lenght>0){
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