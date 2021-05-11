const med = require("../../model/admin/pharmacy/medicine")
const labTest = require("../../model/admin/investigation_daignosic/lab_test")
const alergis = require("../../model/admin/alergies")
const daignos = require("../../model/Doctor/daignosis")
const pres_med = require("../../model/Doctor/prescription_med")
const pres_lab = require("../../model/Doctor/prescription_lab_ins")

const patient_pres = require("../../prescription_pdf")
const Prescription = require("../../model/Doctor/prescription")
const cloud = require("../../cloudinary")
const Patient = require("../../model/helth_worker/patient_registration")
const Fs = require('fs')

exports.list_daignosis =(req,res)=>{
    var daignosis = new RegExp('^'+req.body.search,'i');
    daignos.find({daignosis:daignosis}).exec((err,resp)=>{
        if(err){
            res.json({code:400,msg:'daignosis list not found'})
        }
        else{
            res.json({code:200,msg:resp})
        }
    })
}

exports.add_daignosis =(req,res)=>{
    var daignosObj = new daignos(req.body)
    daignosObj.save((err,resp)=>{
        if(err){
            res.json({code:400,msg:'daignos not add'})
        }
        else{
            res.json({code:200,msg:'daignos add'})
        }
    })
}

exports.medicine_list =(req,res)=>{
    med.find()
    .select('medicine_name')
    .select('mrp')
    .select('intro_text')
    .exec((err,resp)=>{
        if(err){
            res.json({code:400,msg:'medicine list not found'})
        }
        else{
            res.json({code:200,msg:resp})
        }
    })
}

exports.lab_test_list =(req,res)=>{
   labTest.find()
   .select('lab_name')
   .exec((err,resp)=>{
        if(err){
            res.json({code:400,msg:'labTest list not found'})
        }
        else{
            res.json({code:200,msg:resp})
        }
    })
}

exports.list_alergies =(req,res)=>{
    alergis.find().exec((err,resp)=>{
        if(err){
            res.json({code:400,msg:'alergies list not found'})
        }
        else{
            res.json({code:200,msg:resp})
        }
    })
}

exports.add_alergies =(req,res)=>{
    var alergisObj = new alergis(req.body)
    alergisObj.save((err,resp)=>{
        if(err){
            res.json({code:400,msg:'alergies not add'})
        }
        else{
            res.json({code:200,msg:resp})
        }
    })
}

exports.add_prescription =async (req,res)=>{
    var preObj = new Prescription(req.body)
    preObj.save((err,resp)=>{
        if(err){
            res.json({code:400,msg:'prescription not add'})
        }else{
            console.log(resp)

            patient_pres.patPrescription(resp).then((filePath)=>{
            console.log(filePath)
            var sp = filePath.split('/')
            console.log(sp)
            var lst = sp.slice(-1).pop()
            console.log(lst,'last')

            cloud.prescription_patient(lst).then((pdf)=>{
                console.log(pdf)
                Fs.unlinkSync(pdf.fileP)
                Patient.updateOne({_id:req.body.patientId},{$push:{prescription:resp.id,prescription_url:pdf.url}},(err,resp)=>{
                if(err){
                    res.json({code:400,msg:'prescription not add in patient'})
                }else{
                    res.json({code:200,msg:'prescription add successfully'})
                }
              })
            })
         })
      }
    })

}

exports.med_info = (req,res)=>{
    var preMedObj = new pres_med(req.body)
    console.log(preMedObj)
    preMedObj.save((err,resp)=>{
        if(err){
            res.json({code:400,msg:'medicine info not add'})
        }else{
            res.json({code:200,msg:'medicine info add successfully'})
        }
    })
}

exports.list_med_info = (req,res)=>{
    pres_med.find({docId:req.body.docId}).exec((err,resp)=>{
        if(err){
            res.json({code:400,msg:'prescritpion medicine not not get'})
        }else{
            res.json({code:200,msg:resp})
        }
    })
}

exports.lab_info = (req,res)=>{
    var labObj = new pres_lab(req.body)
    console.log(labObj)
    labObj.save((err,resp)=>{
        if(err){
            res.json({code:400,msg:'lab info not add'})
        }else{
            res.json({code:200,msg:'lab info add'})
        }
    })
}

exports.list_lab_info = (req,res)=>{
    pres_lab.find({docId:req.body.docId}).exec((err,resp)=>{
        if(err){
            res.json({code:400,msg:'lab test info not get'})
        }else{
            res.json({code:200,msg:resp})
        }
    })
}