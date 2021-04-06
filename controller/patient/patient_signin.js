const Pat = require("../../model/patient/patient_signin")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const otp = require("../../otp")
var otpGenerator = require('otp-generator')
const _ = require('lodash')

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
            console.log(patient)
            return res.json({ token, data: {username: patient.username, email: patient.email } });
        }
        // res.json({ code: 200, msg: Doc })
    }
}

exports.facebook_Login =(req,res)=>{
    const { email, gmailId, username,login_type } = req.body
    console.log("shubham  gmail data", req.body)
    if (login_type == "gmail") {
        console.log("run")
        Pat.findOne({ $or: [{ email: email }, { gmailId: gmailId }] })
            .then((resp) => {
                console.log(resp)
                if (resp) {
                       res.json({ code: 200, msg: resp })
                   }
                else {
                    console.log(req.body)
                    var pateintinfo = new doc({
                        email: req.body.email,
                        gmailId: req.body.gmailId,
                        user_name: user_name,
                       
                    })
                    var Token = jwt.sign({ _id: pateintinfo._id }, process.env.JWT_SECRET)
                    pateintinfo.bearer_token = Token
                    console.log(pateintinfo)

                    pateintinfo.save((err, Data) => {
                        if (err) {
                            res.send(err)
                        }
                        else {
                            console.log("shubham shukla")
                            res.json({ code: 200, msg: Data })
                        }
                    })
                }
            }).catch((error) => {
                res.send({code: 400, msg: 'data is empty'})
            })
    } else if (login_type == 'facebook') {
        Pat.findOne({ gmailId: gmailId })
        .then((resp) => {
                console.log(resp)
                if(resp){
                    //console.log("shubham medicaps")
                    res.json({ code: 200, msg: resp })
                }
                else {
                    console.log(req.body)
                    var patientinfo = new Pat({
                        email: req.body.email,
                        gmailId: req.body.gmailId,
                        username: username,

                    })
                    var Token = jwt.sign({ _id: patientinfo._id }, process.env.JWT_SECRET)
                    patientinfo.bearer_token = Token
                    console.log(patientinfo)
                    patientinfo.save((err, Data) => {
                        if (err) {
                            res.send(err)
                        }
                        else {
                            console.log("Run")
                            res.send({ code: 200, msg: Data })
                        }
                    })
                }
            }).catch((error) => {
                res.json({code:400,msg:'data is empty'})
            })
    }
}

exports.otpSend = async (req,res)=>{
    var str = req.body.forgetpass  
    var patt1 = /^[0-9]*$/;
    if(str.match(patt1)){
        //console.log("Sveltosh technology")

        Pat.findOne({mobile_number:req.body.forgetpass}) 
        .exec((err,data)=>{
        if(err || !data){
          res.json({code:400, error:'this number does not exist'})  
        }
        else{
        const OTP =  otpGenerator.generate(4, {digits: true, upperCase: false, specialChars: false,alphabets:false});
        console.log(OTP, typeof OTP)
        
        otp.send_otp(str,OTP).then((data)=>{
            Pat.updateOne({mobile_number:str},{$set:{otp:OTP}},(err,respdata)=>{
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

        var Email = await Pat.findOne({email:req.body.email})
        if(!Email){
            res.json({code:400, msg:'this email id not exist'})
        }else{

        }
    }
}

exports.otpVerify =(req,res)=>{
    Pat.findOne({mobile_number:req.body.mobile_number})
    .exec((err,resp)=>{
        if(err || !resp){
            res.json({ code:400,msg:'mobile not does not exist'})
        }
       else{
            if(resp.otp === req.body.otp){
                Pat.findOneAndUpdate({mobile_number:req.body.mobile_number},{$set:{otp:" "}},(err,patUpdate)=>{
                if(err){
                        res.json(err)
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

exports.passwordupdate = async(req,res)=>{
    console.log(req.body.password,req.body.confirmPass)
    if(req.body.password === req.body.confirmPass){
        const Password = await hashPassword(req.body.password)
        Pat.findByIdAndUpdate(req.body.patient_id,{$set:{password:Password}},
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


