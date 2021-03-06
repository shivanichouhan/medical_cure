const patient = require("../../model/helth_worker/patient_registration")
const _ = require("lodash")
const cloud = require("../../cloudinary")

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
    var patientObj = new patient(req.body)
    var Patient = _.extend(patientObj,{userId:req.params.userId})
    console.log(Patient)
    patientObj.save((err,patientData)=>{
        if(err){
            res.json(err)
        }
        else{
            if(req.file){
                const { path } = req.file
                cloud.uploads(path,'patient').then((resp)=>{
                    patient.findByIdAndUpdate(patientData._id,{$set:{patient_img:resp.url}})
                    .then((resPatient)=>{
                        res.json(resPatient)
                    }).catch((error)=>{
                        res.json(error)
                    })
                }).catch((err)=>{
                    res.send(err)
              })
            }
            else{
                res.json(patientData)
            }
        }
    })
}