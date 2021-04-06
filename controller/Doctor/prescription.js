const med = require("../../model/admin/pharmacy/medicine")
const labTest = require("../../model/admin/investigation_daignosic/lab_test")
const alergis = require("../../model/admin/alergies")
const {Icd10Api} = require('icd10-api')
const daignos = require("../../model/Doctor/daignosis")

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