const med = require("../../model/admin/pharmacy/medicine")
const labTest = require("../../model/admin/investigation_daignosic/lab_test")

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