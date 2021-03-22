const doc = require("../../model/Doctor/doctor_regis")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
var otpGenerator = require('otp-generator')
const otp = require("../../otp")
const _ = require('lodash')

async function hashPassword(password) {
    return await bcrypt.hash(password, 10)
}

async function validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword)
}

exports.doctor_reg = async (req, res) => {
    const OTP = otpGenerator.generate(2, { digits: true, upperCase: false, specialChars: false, alphabets: false });
    console.log(req.body)

    const { user_name, email, password } = req.body;
    console.log(email)
    const hashedPassword = await hashPassword(password)
    const data_check = await doc.findOne({ email: email })

    console.log(data_check)
    if (!data_check) {
        const datas = new doc({
            username: user_name,
            email: email,
            password: hashedPassword,

        })
        datas.user_id = datas._id
        datas.dumy_userName = '@' + user_name + OTP
        datas.save()
            .then((resp) => {
                res.json({ code: 200, msg: resp })
            })

    }else{
        res.json({ code: 400, msg: "Email already exist" })
    }
}

exports.doctorLogin = async (req, res) => {
    var { email, password } = req.body
    console.log(email)
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
            // const Doc = await doc.findByIdAndUpdate({_id:user._id},{$set:{ bearer_token: token} })
            // res.cookie('token', token, { expire: new Date() + 9999 })
            console.log(user)
            return res.json({ code:200, msg: {bearer_token:token,username: user.username, email: user.email, dumy_userName: user.dumy_userName, user_id: user.user_id } });
        }
        // res.json({ code: 200, msg: Doc })
    }
}

exports.log_social =(req,res)=>{
    const OTP = otpGenerator.generate(2, { digits: true, upperCase: false, specialChars: false, alphabets: false });
    const { email, gmailId, username, photo, login_type } = req.body
    console.log("shivani gmail data", req.body)
    if (login_type == "gmail") {
        doc.findOne({ $or: [{ email: email }, { gmailId: gmailId }] })
            .then((resp) => {
                if (resp) {
                        const token = jwt.sign({ _id: resp._id }, process.env.JWT_SECRET)
                        var result = _.extend(resp,{bearer_token:token})
                        res.json({ code: 200, msg: result })
                   }
                else {
                    console.log(req.body)
                    var userinfo = new doc({
                        email: req.body.email,
                        gmailId: req.body.gmailId,
                        username: username,
                        // profile_pic: photo
                    })
                    var Token = jwt.sign({ _id: userinfo._id }, process.env.JWT_SECRET)
                    userinfo.bearer_token = Token
                    userinfo.dumy_userName =  '@' + username + OTP
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
                res.json({code:400,msg:'data not come'})
            })
    } else if (login_type == 'facebook') {
        doc.findOne({ $or: [{ email: email }, { gmailId: gmailId }]})
        .then((resp) => {
                console.log(resp)
                if(resp){
                    const token = jwt.sign({ _id: resp._id }, process.env.JWT_SECRET)
                    var result = _.extend(resp,{bearer_token:token})
                    res.json({ code: 200, msg: result })
                }
                else {
                    console.log(req.body)
                    var userinfo = new doc({
                        email: req.body.email,
                        gmailId: req.body.gmailId,
                        username: username,
                        // profile_pic: photo
                    })
                    var Token = jwt.sign({ _id: userinfo._id }, process.env.JWT_SECRET)
                    userinfo.bearer_token = Token
                    userinfo.dumy_userName =  '@' + username + OTP
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
                res.json({code:400,msg:'data not come'})
            })
    }
}

exports.otpSend = async (req,res)=>{
    var str = req.body.type  
    var patt1 = /^[0-9]*$/;
    if(str.match(patt1)){
        doc.findOne({Phone_Number:str}) 
        .exec((err,data)=>{
        if(err || !data){
          res.json({code:400, error:'this number does not exist'})  
        }
        else{
        const OTP =  otpGenerator.generate(4, {digits: true, upperCase: false, specialChars: false,alphabets:false});
        console.log(OTP, typeof OTP)
        
        otp.send_otp(str,OTP).then((data)=>{
        doc.updateOne({Phone_Number:str},{$set:{otp:OTP}},(err,respdata)=>{
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
        var Email = await doc.findOne({email:str})
        console.log(Email)
        if(!Email){
            res.json({code:400, msg:'this email id not exist'})
        }else{
            console.log(Email.gmailId)
            if(Email.gmailId == undefined){
                const OTP =  otpGenerator.generate(4, {digits: true, upperCase: false, specialChars: false,alphabets:false});
                console.log(OTP, typeof OTP)
                doc.updateOne({email:str},{$set:{otp:OTP}},(err,respdata)=>{
                    if(err){
                        res.json({code:400,msg:'otp not add in doctor'})
                    }
                    else{
                        res.json({code:200,msg:"otp send successfully",otp:OTP})
                    }
                  }).catch((err)=>{
                    res.send(err)
              })
            }
            else{
                res.json({code:400,error:'you are login gmail or facebook'})
            }
  
        }
    }
}

exports.otpVerify =(req,res)=>{
    var str = req.body.type  
    var patt1 = /^[0-9]*$/;
    if(str.match(patt1)){
        doc.findOne({Phone_Number:str})
        .exec((err,resp)=>{
            if(err || !resp){
                res.json({ code:400,msg:'mobile not does not exist'})
            }
           else{
                if(resp.otp === req.body.otp){
                    doc.findOneAndUpdate({Phone_Number:str},{$set:{otp:" "}},(err,docUpdate)=>{
                    if(err){
                            res.json(err)
                        }
                        else{
                            res.json({code:200,doctor_id:docUpdate._id,msg:'otp verfiy successfully'})
                        }   
                    })
                }
                else{
                    res.json({code:400 ,error:'wrong otp'})
                }
           } 
        })
    }
    else{
        console.log('email coming')
        doc.findOne({email:str})
        .exec((err,resp)=>{
            if(err || !resp){
                res.json({ code:400,msg:'email not does not exist'})
            }
           else{
               console.log(resp)
                if(resp.otp === req.body.otp){
                    doc.findOneAndUpdate({email:str},{$set:{otp:" "}},(err,docUpdate)=>{
                    if(err){
                            res.json(err)
                        }
                        else{
                            res.json({code:200,doctor_id:docUpdate._id,msg:'otp verfiy successfully'})
                        }   
                    })
                }
                else{
                    res.json({code:400 ,error:'wrong otp'})
                }
           } 
        })
    }

}

exports.passupdate = async(req,res)=>{
    console.log(req.body.password,req.body.confirmPass)
    if(req.body.password === req.body.confirmPass){
        const Password = await hashPassword(req.body.password)
    
        doc.findByIdAndUpdate(req.body.doctor_id,{$set:{password:Password}},
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

