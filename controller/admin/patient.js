const Patient = require("../../model/helth_worker/patient_registration")

exports.list_patient = (req,res)=>{
    Patient.find().exec((err,listPat)=>{
        if(err){
            res.json(err)
        }
        else{
            res.json({data:listPat})
        }
    })
}