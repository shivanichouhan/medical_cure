const Patient = require("../../model/helth_worker/patient_registration")
const cloud = require("../../cloudinary")
const fs = require("fs")

exports.list_patient = (req,res)=>{
    Patient.find().exec((err,listPat)=>{
        if(err || !listPat){
            res.json({code:400,msg:'patient list not found'})
        }
        else{
            res.json({code:200,msg:listPat})
        }
    })
}

exports.update_patient = (req,res)=>{
   
    // console.log(req.body.child)
    Patient.findByIdAndUpdate(req.params.patientId,req.body)
    .exec((err,resp)=>{
        if(err){
            res.json({code:400,msg:'patient detail is not update'})
        }
        else{
            if(req.file){
                console.log(req.file)
                cloud.up(req.file.path).then((imgObj)=>{
                    fs.unlinkSync(req.file.path)
                    console.log(imgObj)
                    Patient.findByIdAndUpdate(resp._id,{$set:{patient_img:imgObj.url}})
                    .exec((err,pat)=>{
                        if(err){
                            res.json({code:400, msg:'patient img not update'})
                        }
                        else{
                            res.json({code:200, msg:'patient detail update with img'})
                        }
                    })
                }).catch((err)=>{
                    res.json({code:400,msg:'image url not create'})
                })
            }
            else{
                res.json({code:200,msg:'patient detail update successfully'})
            }
        }
    })

}

exports.remove_patient =(req,res)=>{
    Patient.remove({_id:req.params.patientId},(err,resp)=>{
        if(err){
            res.json({code:400,msg:'patient is not remove'})
        }
        else{
            res.json({code:200,msg:'patient is remove successfully'})
        }
    })
    
}