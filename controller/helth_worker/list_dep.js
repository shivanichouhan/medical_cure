const dep = require('../../model/admin/department/departments')

exports.depList =(req,res)=>{
    dep.find({department_status:'Active'},{disease:0,updatedAt:0,__v:0})
    .exec((err,listDep)=>{
        if(err || !listDep){
            res.json({code:400,msg:'department list not found'})
        }
        else{
            res.json({code:200,msg:listDep})
        }
    })
}

exports.desList =(req,res)=>{
    console.log('run')
    dep.findOne({_id:req.body.department_id},{upsert:true})
    .populate('disease','disease_name icon ')
    .exec((err,listDes)=>{
        if(err || !listDes){
            res.json({code:400,msg:'disease list not found'})
        }
        else{
            res.json({code:200,msg:listDes})
        }
    })
}