const med = require("../../model/admin/pharmacy/medicine")
const labTest = require("../../model/admin/investigation_daignosic/lab_test")
const alergis = require("../../model/admin/alergies")
const daignos = require("../../model/Doctor/daignosis")
const pres_med = require("../../model/Doctor/prescription_med")
const pres_lab = require("../../model/Doctor/prescription_lab_ins")
const pres_dai = require("../../model/Doctor/prescription_dai")
const pres_alergies = require("../../model/Doctor/prescription_alergis")


const patient_pres = require("../../prescription_pdf")
const Prescription = require("../../model/Doctor/prescription")
const cloud = require("../../cloudinary")
const doc = require("../../model/Doctor/doctor_regis")
const Patient = require("../../model/helth_worker/patient_registration")
const Fs = require('fs')
const { promises } = require("dns")

exports.list_daignosis =(req,res)=>{
    // var daignosis = new RegExp('^'+req.body.search,'i');
    daignos.find().exec((err,resp)=>{
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
    var patientInfo = await Patient.findOne({_id:req.body.patId}) 
    var docInfo = await doc.findOne({_id:req.body.docId},{username:1,Course:1})
    var pat_med_info = await pres_med.find({$and:[{patId:req.body.patId},{docId:req.body.docId}]})
    var pat_lab_info = await pres_lab.find({$and:[{patId:req.body.patId},{docId:req.body.docId}]})
  
    preObj.medicine_details = pat_med_info
    preObj.lab_test_details = pat_lab_info
  
    preObj.save((err,presInfo)=>{
        if(err){
            res.json({code:400,msg:'prescription not add'})
        }else{
            console.log('save resp',presInfo)
            patient_pres.patPrescription(presInfo,patientInfo,docInfo).then((filePath)=>{
            console.log(filePath)
            var sp = filePath.split('/')
            console.log(sp)
            var lst = sp.slice(-1).pop()
            console.log(lst,'last')

            cloud.prescription_patient(lst).then((pdf)=>{
                console.log(pdf,'pdf url')
                Fs.unlinkSync(pdf.fileP)
                Patient.updateOne({_id:req.body.patId},{$push:{prescription:presInfo._id,prescription_url:pdf.url}},(err,resp)=>{
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
    console.log('run')
    pres_med.find({$and:[{patId:req.body.patId},{docId:req.body.docId}]}).exec((err,resp)=>{
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
    pres_lab.find({$and:[{patId:req.body.patId},{docId:req.body.docId}]}).exec((err,resp)=>{
        if(err){
            res.json({code:400,msg:'lab test info not get'})
        }else{
            res.json({code:200,msg:resp})
        }
    })
}

exports.daignosis_name = async(req,res)=>{
    var dName = req.body.daignosis
    console.log(dName)
    var dAry = dName.split(',')
    console.log(dAry)
    var daiInfo = await pres_dai.findOne({$and:[{patId:req.body.patId},{docId:req.body.docId}]})
    if(daiInfo){
        console.log(daiInfo)
        var daigAray = daiInfo.daignosis_name
        
        await Promise.all(dAry.map(async (items) => {
            console.log(items)
            if(daigAray.includes(items)){
                console.log('include')
            }else{
                console.log('include not')
                 await pres_dai.updateOne({docId:req.body.docId,patId:req.body.patId},{$push:{daignosis_name:items}})
            }
        })).then((resp)=>{
            res.send({code:200,msg:'daignosis update successfully'})
        }).catch((err)=>{
            console.log(err)
            res.send({code:400,msg:'daignosis not update'})
        })
    }else{
           var daiObj =  new pres_dai({ daignosis_name:dAry})
           daiObj.patId = req.body.patId
           daiObj.docId = req.body.docId
           daiObj.save((err,resp)=>{
               if(err){
                   res.send({code:400,msg:'daignoisis name not add'})
               }else{
                   res.send({code:200,msg:'daignosis name add'})
               }
           })
    }   

}

exports.list_dai =(req,res)=>{
    pres_dai.findOne({$and:[{patId:req.body.patId},{docId:req.body.docId}]}).exec((err,resp)=>{
        if(err){
            res.json({code:400,msg:'daignoisis list not found'})
        }else{
            var dn = resp.daignosis_name
            var data = []
            dn.forEach(element => {
               var obj ={} 
               obj.name = element
               data.push(obj)
            });
            res.json({code:200,msg:data})
        }
    })
}

exports.alergies_name = async (req,res)=>{
    var aName = req.body.alergies
    console.log(aName)
    var aAry = aName.split(',')
    console.log(aAry)

    var alergiInfo = await pres_alergies.findOne({$and:[{patId:req.body.patId},{docId:req.body.docId}]})
    if(alergiInfo){
        console.log(alergiInfo)
        var alergisAray = alergiInfo.alergies_name
        
        await Promise.all(aAry.map(async (items) => {
            console.log(items)
            if(alergisAray.includes(items)){
                console.log('include')
            }else{
                console.log('include not')
                 await pres_alergies.updateOne({docId:req.body.docId,patId:req.body.patId},{$push:{alergies_name:items}})
            }
        })).then((resp)=>{
            res.send({code:200,msg:'alergies update successfully'})
        }).catch((err)=>{
            console.log(err)
            res.send({code:400,msg:'alergies not update'})
        })
    }else{
           var alergiObj =  new pres_alergies({ alergies_name:aAry})
           alergiObj.patId = req.body.patId
           alergiObj.docId = req.body.docId
           alergiObj.save((err,resp)=>{
               if(err){
                   res.send({code:400,msg:'alergies name not add'})
               }else{
                   res.send({code:200,msg:'alergies name add'})
               }
           })
    }   
}

exports.alergies_list = (req,res)=>{
    pres_alergies.findOne({$and:[{patId:req.body.patId},{docId:req.body.docId}]}).exec((err,resp)=>{
        if(err){
            res.json({code:400,msg:'alergies list not found'})
        }else{
            var dn = resp.alergies_name
            var data = []
            dn.forEach(element => {
               var obj ={} 
               obj.name = element
               data.push(obj)
            });
            res.json({code:200,msg:data})
        }
    })
}