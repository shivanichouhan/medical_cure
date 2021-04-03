const doc = require("../../model/Doctor/doctor_regis")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
var otpGenerator = require('otp-generator')
const otp = require("../../otp")
const _ = require('lodash')
const cloud = require("../../cloudinary")
const fs = require('fs')

async function hashPassword(password) {
    return await bcrypt.hash(password, 10)
}

async function validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword)
}

exports.doctor_info =(req,res)=>{
   doc.find({_id:req.params.docId},{
    username:1,
    profile_pic:1,
    email:1,
    dumy_userName:1,
    mobile_number:1,
    Address:1,
    Gender:1,
    register:1,
    DOB:1
   })
  .exec((err,resp)=>{
      if(err){
          res.json({code:400,msg:'doctor info not find'})
      }
      else{
          res.json({code:200,msg:resp})
      }
  })
}

exports.reg_from = async(req,res)=>{
    var data = _.extend(req.body,{register:"1"})
    console.log(data)
    doc.findByIdAndUpdate(req.params.docId,{$set:data}).exec(async(err,resp)=>{
        if(err){
            res.json({code:400,msg:'doctor details not save'})
            console.log(err,'doc_detail')
        }
        else{
             if(req.files){
            //    const doc_cer = req.files.certificate_Img
               const lic_front = req.files.License_img_front_side
               const lic_back = req.files.License_img_back_side
            //    const doc_pass_cer = req.files.passing_year_certificate
               const identity_front = req.files.identity_front_side_img
               const identity_back = req.files.identity_back_side_img

            //    const docreg = async (path)=> await cloud.doctor_reg(path)
               const front_lic = async (path)=> await cloud.licence_front(path)
               const back_lic = async (path)=> await cloud.licence_back(path)
            //    const pass_certificate = async (path)=> await cloud.doc_pass(path)
               const identiy_front = async (path)=> await cloud.iden_front(path)
               const identiy_back = async (path)=> await cloud.iden_back(path)

            //    const p1 =doc_cer[0].path
               const p2 =lic_front[0].path
               const p3 =lic_back[0].path
            //    const p4 =doc_pass_cer[0].path
               const p5 =identity_front[0].path
               const p6 =identity_back[0].path
               
            //    const url_cer = await docreg(p1)
               const lice_front = await front_lic(p2)
               const lice_back = await back_lic(p3)
            //    const url_pass = await pass_certificate(p4)
               const iden_front = await identiy_front(p5)               
               const iden_back = await identiy_back(p6)                              

               console.log(lice_front,lice_back,iden_front,iden_back)
            //    fs.unlinkSync(p1)
               fs.unlinkSync(p2)
               fs.unlinkSync(p3)
            //    fs.unlinkSync(p4)
               fs.unlinkSync(p5)
               fs.unlinkSync(p6)

               doc.findByIdAndUpdate(resp._id,{$push:{
                   License_img_front_side:lice_front,
                   License_img_back_side:lice_back,
                   identity_front_side_img:iden_front,
                   identity_back_side_img:iden_back,
               },$set:{register:"1"}}).exec((err,resDoc)=>{
                   if(err){
                       res.send({code:400,msg:'images not add in doctor'})
                       console.log(err,'doc_img')
                   }
                   else{
                       res.send({code:200,msg:'success with img'})
                   }
               })
            }
            else{
                res.send({code:200,msg:'success'})
              
            }
        }
    })
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
            const Doc = await doc.updateOne({_id:user._id},{$set:{firebase_token : req.body.firebase_token} })
            if(Doc){
             return res.json({ code:200, msg: {bearer_token:token,username: user.username, email: user.email, dumy_userName: user.dumy_userName, user_id: user.user_id ,register:user.register} });    
            }
            else{
                res.json({code:400,msg:'firebase token not update'})
            }
            
        }
        // res.json({ code: 200, msg: Doc })
    }
}

exports.log_social = async(req,res)=>{
    console.log(req.body)
    const OTP = otpGenerator.generate(2, { digits: true, upperCase: false, specialChars: false, alphabets: false });
    const { email, gmailId, username, photo, login_type } = req.body
    console.log("shivani gmail data", req.body)
    if (login_type == "gmail") {
        doc.findOne({ $or: [{ email: email }, { gmailId: gmailId }] })
            .then(async(resp) => {
                if (resp) {
                      var fire_token = await doc.updateOne({_id:resp._id},{$set:{firebase_token:req.body.firebase_token}})
                      if(fire_token){
                        const token = jwt.sign({ _id: resp._id }, process.env.JWT_SECRET)
                        var result = _.extend(resp,{bearer_token:token})
                        res.json({ code: 200, msg: result })
                      }                       
                       else{
                        res.json({ code: 400, msg: 'fire_base token not update' })
                       } 
                   }
                else{
                    console.log(req.body)
                    var userinfo = new doc({
                        email: req.body.email,
                        gmailId: req.body.gmailId,
                        username: username,
                        firebase_token:req.body.firebase_token
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
        .then(async(resp) => {
                console.log(resp)
                if(resp){
                    var firebase_token = await doc.updateOne({_id:resp._id},{$set:{firebase_token:req.body.firebase_token}})
                  if(firebase_token){
                    const token = jwt.sign({ _id: resp._id }, process.env.JWT_SECRET)
                    var result = _.extend(resp,{bearer_token:token})
                    res.json({ code: 200, msg: result })
                  }
                  else{
                    res.json({ code: 400, msg: 'fire_base token not update' })
                   } 
                }
                else {
                    console.log(req.body)
                    var userinfo = new doc({
                        email: req.body.email,
                        gmailId: req.body.gmailId,
                        username: username,
                        firebase_token:req.body.firebase_token
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
    console.log(str)
    var patt1 = /^[0-9]*$/;
    if(str.match(patt1)){
        doc.findOne({mobile_number:str}) 
        .exec((err,data)=>{
        if(err || !data){
          res.json({code:400, error:'this number does not exist'})  
        }
        else{
        const OTP =  otpGenerator.generate(4, {digits: true, upperCase: false, specialChars: false,alphabets:false});
        console.log(OTP, typeof OTP)
        
        otp.send_otp(str,OTP).then((data)=>{
            res.send(data)
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

