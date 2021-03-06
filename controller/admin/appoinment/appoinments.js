const patient_app = require("../../../model/admin/appoinment/appoinments")
const patient = require("../../../model/helth_worker/patient_registration")

exports.create_app =(req,res)=>{
    var appObj = new patient_app(req.body)
    appObj.save((err,resp)=>{
        if(err){
            res.json(err)
        }
        else{
            patient.updateOne({_id:req.params.patientId},{$push:{Appoinment:resp._id}},
             (err,appUpdte)=>{
                 if(err){
                     res.json(err)
                 }
                 else{
                     res.json({result:resp,msg:appUpdte})
                 }
             })
        }
    })
}

exports.list_app =(req,res)=>{
    console.log('run')
    patient.find()
    .select('patient_name')
    .select('patient_img')
    .select('age')
    .populate('Appoinment','appoinment_id doctor_name department app_date app_time status')
    .exec((err,resp)=>{
        if(err){
            res.json(err)
        }
        else{
            res.json(resp)
        }
    })
}

exports.edit_app =(req,res)=>{
    patient_app.updateOne({_id:req.params.appId},req.body,(err,appUpdate)=>{
        if(err){
            res.json(err)
        }
        else{
            res.json(appUpdate)
        }
    })
}

exports.remove_app =(req,res)=>{
    patient_app.remove({_id:req.params.appId},(err,appDel)=>{
        if(err){
            res.json(err)
        }
        else{
            res.json(appDel)
        }
    })
}