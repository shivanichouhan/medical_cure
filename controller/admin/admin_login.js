const bcrypt = require('bcryptjs')
const express = require('express')
const jwt = require('jsonwebtoken')
const otp = require("../../otp")
var otpGenerator = require('otp-generator')
const _ = require('lodash')
const Admin = require('../../model/admin/admin_login')

async function hashPassword(password) {
    return await bcrypt.hash(password, 10)
}

async function validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword)
}

exports.signup = async (req, res) => {
    console.log(req.body)
        const { user_name, email,phone,password, con_password } = req.body;
            const Password = await hashPassword(password)
            const data_check = await Admin.findOne({ email: email })
            console.log(data_check)
            if (!data_check) {
                const datas = new Admin({
                    user_name: user_name,
                    email: email,
                    password: Password,
                     //phone: phone
                })
                datas.save()
                    .then((resp) => {
                        res.json({ code: 200, msg: "signup successfully" })
                    }).catch((err)=>{
                        console.log(err)

                    })
            } else {
                res.json({ code: 200, msg: "Email already exist" })
          }
};

/*exports.signin = async (req, res) => {
    var { email, password } = req.body
    console.log(email)
    const admin = await Admin.findOne({ email: email })
    if (!admin) {
        res.json({
            code: 400,
            msg: 'Admin with that email does not exist. Please signup'
        })
    }
    else {
        const validPassword = await validatePassword(password, admin.password)
        console.log(validPassword, '44')
        if (!validPassword) {
            res.json({ code: 400, msg: 'Password is not correct' })
        }
        else {
            const token = jwt.sign({ _id: admin._id }, process.env.JWT_SECRET)
            console.log(token)
            console.log(admin)
            return res.json({ token, data: {username: admin.username, email: admin.email } });
        }
        // res.json({ code: 200, msg: Doc })
    }
}*/

exports.signin = async (req, res) => {
    const { email, password } = req.body
    const admin = await Admin.findOne({email:email})
    if (!admin) {
        res.json({
            code: 400,
            msg: 'email id is wrong'
        })
    }
    else{
    const validPassword = await validatePassword(password, admin.password)
    if (!validPassword) {
        res.json({ code: 400, msg: 'Password is not correct' })
    }
    else{
    const token = jwt.sign({ _id: admin._id,role:admin.role }, process.env.JWT_SECRET,{expiresIn:'24h'} )

    localStorage.setItem('token',token)
     const Doc = await Admin.findByIdAndUpdate({_id:admin._id},{$set:{ bearer_token: token} })
     res.cookie('token', token, { expire: new Date() + 9999 })
    //res.redirect("/deshboard")
     return res.json({ token, data: {_id:admin._id,name:admin.username,email:admin.email,password:admin.password}});
    }
  }
}



exports.otpSend = async (req,res)=>{
    var str = req.body.type  
    var patt1 = /^[0-9]*$/;
    if(str.match(patt1)){
        Admin.findOne({Phone:str}) 
        .exec((err,data)=>{
        if(err || !data){
          res.json({code:400, error:'this number does not exist'})  
        }
        else{
        const OTP =  otpGenerator.generate(4, {digits: true, upperCase: false, specialChars: false,alphabets:false});
        console.log(OTP, typeof OTP)
        
        otp.send_otp(str,OTP).then((data)=>{
        Admin.updateOne({Phone:str},{$set:{otp:OTP}},(err,respdata)=>{
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
        var Email = await Admin.findOne({email:str})
        console.log(Email)
        if(!Email){
            res.json({code:400, msg:'this email id not exist'})
        }else{
            console.log(Email.gmailId)
            if(Email.gmailId == undefined){
                const OTP =  otpGenerator.generate(4, {digits: true, upperCase: false, specialChars: false,alphabets:false});
                console.log(OTP, typeof OTP)
                Admin.updateOne({email:str},{$set:{otp:OTP}},(err,respdata)=>{
                    if(err){
                        res.json({code:400,msg:'otp not add in admin'})
                    }
                    else{
                        res.json({code:200,msg:"otp send successfully",otp:OTP})
                    }
                  }).catch((err)=>{
                    res.send(err)
              })
            }
            else{
                res.json({code:400,error:'you are login gmail '})
            }
  
        }
    }
}


exports.otpVerify =(req,res)=>{
    var str = req.body.type  
    var patt1 = /^[0-9]*$/;
    if(str.match(patt1)){
        Admin.findOne({Phone:str})
        .exec((err,resp)=>{
            if(err || !resp){
                res.json({ code:400,msg:'mobile not does not exist'})
            }
           else{
                if(resp.otp === req.body.otp){
                    Admin.findOneAndUpdate({Phone:str},{$set:{otp:" "}},(err,AdmUpdate)=>{
                    if(err){
                            res.json(err)
                        }
                        else{
                            res.json({code:200,admin_id:AdmUpdate._id,msg:'otp verfiy successfully'})
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
        Admin.findOne({email:str})
        .exec((err,resp)=>{
            if(err || !resp){
                res.json({ code:400,msg:'email not does not exist'})
            }
           else{
               console.log(resp)
                if(resp.otp === req.body.otp){
                    Admin.findOneAndUpdate({email:str},{$set:{otp:" "}},(err,admUpdate)=>{
                    if(err){
                            res.json(err)
                        }
                        else{
                            res.json({code:200,admin_id:admUpdate._id,msg :'otp verfiy successfully'})
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

exports.passwordupdate = async(req,res)=>{
    console.log(req.body.password,req.body.confirmPass)
    if(req.body.password === req.body.confirmPass){
        const Password = await hashPassword(req.body.password)
        Admin.findByIdAndUpdate(req.body.admin_id,{$set:{password:Password}},
        (err,passupdate)=>{
            console.log("shubham shukla")
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

exports.edit_admin_profile = (req, res) => {
    Admin.updateOne({ _id: req.params.adminId }, req.body, (err, resp) => {
        if (err) {
            res.json(err)
        }
        else {
            res.json(resp)
        }
    })
}


exports.logout=(req,res)=>{
    localStorage.removeItem('token')
    res.json({msg:'logout successfully'})
}