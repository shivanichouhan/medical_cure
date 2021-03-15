const patient = require("../../model/helth_worker/patient_registration")
const _ = require("lodash")
const cloud = require("../../cloudinary")
const otp = require("../../otp")
const otpGenerator = require('otp-generator')
const fs = require('fs')

exports.patient_list =(req,res)=>{
    patient.find({$and:[{userId:req.params.userId},
                 {$or:[{patient_name:req.body.patient_name},{mobile:req.body.mobile}]}]})
    .exec((err,List)=>{
        if(err){
            res.json(err)
        }
        else{
          
            res.json(List)
        }
    })
}

exports.create =(req,res)=>{
    patient.findOne({mobile:req.body.mobile})
    .exec((err,resp)=>{
        if(err){
            res.json(err)
            console.log(err)
        }
        else{
            if(resp){
                res.json({code:400,msg:'mobile no already exist'})
            }
            else{   
                    const OTP =  otpGenerator.generate(4, {digits: true, upperCase: false, specialChars: false,alphabets:false});
                    res.send(resp)
                    otp.send_otp(req.body.mobile,OTP).then((resp)=>{
                        var patObj = new patient(req.body)
                        patObj.health_worker_id =req.params.userId
                        patObj.otp = OTP
                        patObj.save((err,data)=>{
                            if(err){
                                res.json({code:400,msg:'patient detail not save'})
                                console.log(err)
                            }
                            else{
                                res.json({code:200,msg:'otp send successfully'})
                            }
                        })

                    }).catch((err)=>{
                        res.json({code:400,msg:'otp not sent'})
                })
            }
        }
    })  
}

exports.patient_verfiy =(req,res)=>{
    patient.findOne({mobile:req.body.mobile})
    .exec((err,resp)=>{
        if(err || !resp){
            res.json({code:400,msg:'mobile no not come or wrong mobile no'})
        }
        else{
            console.log(resp)
                if(resp.otp === req.body.otp){
                    patient.updateOne({_id:resp._id},{$set:{otp:'',mob_verify:true}},(err,updtePatient)=>{
                        if(err){
                              res.json({code:400,msg:'phone no is verify'})  
                        }
                        else{
                             res.json({ code:200,'patient_id':resp._id })
                        }
                    })
                }
                else{
                    res.json({ code:400,msg:'wrong otp'})
                }
            }
        })
}

exports.patient_info =(req,res)=>{
    if(req.file){
    cloud.patient(req.file.path).then((resp)=>{
        fs.unlinkSync(req.file.path)
        console.log(resp.url)
    patient.updateOne({_id:req.params.patientId},{$set:{
        age:req.body.age,
        gender:req.body.gender,
        height:req.body.height,
        weight:req.body.weight,
        patient_img:resp.url
    }}).then((pat)=>{
            res.json({code:200,msg:'patient register successfully'})
        }).catch((error)=>{
            res.json({code:400,msg:'patient details is not save'})
      })
    }).catch((err)=>{
        res.json({code:400,msg:'image url not create'})
    })
   }
   else{
       res.json({code:400,msg:'patient image not come'})
   }

}