// const Pat = require("../../model/patient/patient_signin")
const Patient = require("../../model/helth_worker/patient_registration")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const otp = require("../../otp")
var otpGenerator = require('otp-generator')
const _ = require('lodash')
const cloud = require("../../cloudinary")
const fs = require('fs')

async function hashPassword(password) {
    return await bcrypt.hash(password, 10)
}

async function validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword)
}

exports.patient_signup = async (req, res) => {
    const OTP = otpGenerator.generate(44, { digits: true, upperCase: false, specialChars: false, alphabets: false });
    console.log(req.body)
    const { user_name, email, mobile_number, password } = req.body;
    const hashedPassword = await hashPassword(password)
    const data_check = await Pat.findOne({ email: email })
    console.log(data_check)
    if (!data_check) {
        const datas = new Pat({
            user_name: user_name,
            email: email,
            mobile_number: mobile_number,
            password: hashedPassword,

        })
        datas.save()
            .then((resp) => {
                res.json({ code: 200, msg: resp })
            })

    } else {
        res.json({ code: 400, msg: "Email already exist" })
    }
}

exports.patient_Login = async (req, res) => {
    var { email, password } = req.body
    console.log(email)
    const patient = await Pat.findOne({ email: email })
    if (!patient) {
        res.json({
            code: 400,
            msg: 'Patient with that email does not exist. Please signup'
        })
    }
    else {
        const validPassword = await validatePassword(password, patient.password)
        console.log(validPassword, '44')
        if (!validPassword) {
            res.json({ code: 400, msg: 'Password is not correct' })
        }
        else {
            const token = jwt.sign({ _id: patient._id }, process.env.JWT_SECRET)
            console.log(token)
            console.log(patient,patient.user_name)
            return res.json({ token, data: {user_name: patient.user_name, email: patient.email } });
        }
    }
}

exports.facebook_Login =(req,res)=>{
    const { email, gmailId, username,login_type,profile_pic } = req.body
    console.log("shubham  gmail data", req.body)
    if (login_type == "gmail") {
        Patient.findOne({ $or: [{ email: email }, { gmailId: gmailId }] })
            .then((resp) => {
                console.log(resp)
                if (resp) {
                    console.log('respone come')
                       res.json({ code: 200, msg: resp })
                   }
                else {
                    console.log(req.body)
                    var pateintinfo = new Patient({
                        email: email,
                        gmailId: gmailId,
                        user_name: username,
                        patient_img:profile_pic
                       
                    })
                    var Token = jwt.sign({ _id: pateintinfo._id }, process.env.JWT_SECRET)
                    pateintinfo.bearer_token = Token
                    console.log(pateintinfo,'obj')
                    pateintinfo.save((err, Data) => {
                        if (err) {
                            res.send({code:400,msg:'patient detail not add'})
                        }
                        else {
                            res.json({ code: 200, msg: Data })
                        }
                    })
                }
            }).catch((error) => {
                console.log(error)
                res.send({code: 400, msg: 'data is empty'})
            })
    } else if (login_type == 'facebook') {
        Patient.findOne({ gmailId: gmailId })
        .then((resp) => {
                console.log('inside facebook')
                if(resp){
                    res.json({ code: 200, msg: resp })
                }
                else {
                    console.log(req.body,'inside')
                    var pateintobj = new Patient({
                        email: req.body.email,
                        gmailId: req.body.gmailId,
                        user_name: username,
                        patient_img:profile_pic
                    })
                    console.log(pateintobj)
                    var Token = jwt.sign({ _id: pateintobj._id }, process.env.JWT_SECRET)
                    pateintobj.bearer_token = Token
                    pateintobj.save((err, Data) => {
                        if (err) {
                            res.send({code:400,msg:'patient detail not add'})
                        }
                        else {
                            
                            res.send({ code: 200, msg: Data })
                        }
                    })
                }
            }).catch((error) => {
                console.log(error)
                res.json({code:400,msg:'data is empty'})
            })
    }
}

exports.forget_otpSend = async (req,res)=>{
    var str = req.body.forgetpass  
    var patt1 = /^[0-9]*$/;
    if(str.match(patt1)){
        Patient.findOne({mobile:req.body.forgetpass}) 
        .exec((err,data)=>{
        if(err || !data){
          res.json({code:400, error:'this number does not exist'})  
        }
        else{
        console.log(data.gmailId.length)
        if(data.gmailId.length < 0){
        const OTP =  otpGenerator.generate(4, {digits: true, upperCase: false, specialChars: false,alphabets:false});
        console.log(OTP, typeof OTP)
        otp.send_otp(str,OTP).then((data)=>{
            Patient.updateOne({mobile:str,p_reg:true},{$set:{otp:OTP}},(err,respdata)=>{
            if(err){
                res.json({code:400,msg:'otp number not add in patient'})
            }
            else{
                res.json({code:200,msg:"otp send successfully"})
            }
             })
          }).catch((err)=>{
            res.send({code:400,msg:'otp not send'})
      })
    }
    else{
        res.json({code:400,msg:'you are login gmail or facebook'})
    }
   }
 }) 
}
    else{

        var Email = await Pat.findOne({email:req.body.email})
        if(!Email){
            res.json({code:400, msg:'this email id not exist'})
        }else{

        }
    }
}

exports.forget_otpVerify =(req,res)=>{
    Patient.findOne({mobile:req.body.mobile})
    .exec((err,resp)=>{
        if(err || !resp){
            res.json({ code:400,msg:'mobile not does not exist'})
        }
       else{
            if(resp.otp === req.body.otp){
                Patient.findOneAndUpdate({mobile:req.body.mobile},{$set:{otp:" "}},(err,patUpdate)=>{
                if(err){
                        res.json({code:400,msg:'data not found'})
                    }
                    else{
                        res.json({code:200,patient_id:patUpdate._id,msg:'otp verfiy successfully'})
                    }   
                })
            }
            else{
                res.json({code:400 ,error:'wrong otp'})
            }
       } 
    })
}

exports.reg_otpSend = async (req,res)=>{
    var patData = await Patient.findOne({$and:[{mobile:req.body.mobile},{p_reg:true}]})
    if(patData){
        res.json({code:400,msg:'this mobile no already register'})
    }
    else{
    var patient = await Patient.findOne({ _id: req.body.patientId })
    if (patient) {
        const OTP = otpGenerator.generate(4, { digits: true, upperCase: false, specialChars: false, alphabets: false });
        otp.send_otp(req.body.mobile, OTP).then((result) => {
            Patient.updateOne({_id:req.body.patientId},{$set:{mobile:req.body.mobile,otp:OTP}},
                (err,resp)=>{
                    if(err){
                        res.json({code:400,msg:'mobile no is not add in patient'})
                    }
                    else{
                        res.json({code:200,msg:'otp send successfully'})
                    }
                })

        }).catch((error) => {
            console.log()
            res.json({ code: 400, msg: 'otp not sent' })
        })
    }else{
        res.json({code:400,msg:'patient id not come'})
    }
}
}

exports.reg_otpVerify = async(req,res)=>{
    Patient.findOne({ _id: req.body.patientId })
    .exec((err, resp) => {
        if (err || !resp) {
            res.json({ code: 400, msg: 'wrong patient id' })
        }
        else {
            console.log(resp)
            if (resp.otp === req.body.otp) {
                Patient.updateOne({ _id: resp._id }, { $set: { otp: '', mob_verify: true } }, (err, updtePatient) => {
                    if (err) {
                        res.json({ code: 400, msg: 'phone no is verify' })
                    }
                    else {
                        res.json({ code: 200, msg: 'otp verify success', patient_id: resp._id })
                    }
                })
            }
            else {
                res.json({ code: 400, msg: 'wrong otp' })
            }
        }
    })
}

exports.reg_patient = async(req,res)=>{
    console.log(req.body)
    if(req.body.type == 'self'){
       var result = await Patient.findOne({_id:req.body.patientId})
       if(result){
            Patient.updateOne({_id:req.body.patientId},{
                reg_type:'self',
                patient_id:result._id,
                age:req.body.age,
                gender:req.body.gender,
                height:req.body.height,
                weight:req.body.weight,
                patient_name:req.body.patient_name,
                p_reg:true
            },(err,resp)=>{
                if(err){
                    res.json({code:400,msg:'self patient is not register'})
                }
                else{
                    res.json({code:200,msg:'self patient register successfully'})
                }
            })
       }else{
           res.json({code:400,msg:'patient id is not come'})
       }
    }
    else if(req.body.type == 'other'){
        console.log('run')
        var patObj = new Patient(req.body)
        patObj.patient_id = req.body.patientId
        patObj.reg_type='other'
        patObj.p_reg=true
        console.log(patObj)
        patObj.save((err,resp)=>{
            if(err){
                res.json({code:400,msg:'other patient is not register'})
            }else{
                res.json({code:200,msg:'other patient is register'})
            }
        })
    }
}

exports.passwordupdate = async(req,res)=>{
    console.log(req.body.password,req.body.confirmPass)
    if(req.body.password === req.body.confirmPass){
        const Password = await hashPassword(req.body.password)
        Patient.findByIdAndUpdate(req.body.patient_id,{$set:{password:Password}},
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

exports.edit_patient = async (req,res)=>{
    console.log(req.body)
    console.log(req.file)
    Patient.updateOne({_id:req.body.patientId},req.body,(err,resp)=>{
        if(err){
            res.json({code:400,msg:'patient details not update'})
        }
        else{
            if(req.file){
                const { path } = req.file
                console.log(path)
                cloud.patient(path).then((patImg)=>{
                    fs.unlinkSync(path)
                    console.log(patImg)
                    Patient.updateOne({_id:req.body.patientId},{$set:{patient_img:patImg.url}},(err,resp)=>{
                        if(err){
                            res.json({code:400,msg:'patient img not update'})
                        }
                        else{
                            res.json({code:200,msg:'patient detail update with image'})
                        }
                    })

                }).catch((error)=>{ 
                    res.json({code:400,msg:'img url not create'})
                })

            }else{
                res.json({code:200,msg:'patient details update successfully'})
            }
        }
    })
}

exports.other_patient = async (req,res)=>{
    var data = await Patient.find({$and:[{patient_id:req.params.patient_id},{reg_type:'other'}]})
    if(data.length>0){
        res.json({code:200,msg:data})
    }else{
        res.json({code:400,msg:'other patient data not found'})
    }
}


