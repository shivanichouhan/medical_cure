const dep = require('../../model/admin/department/departments')

exports.depList =(req,res)=>{
    dep.find({department_status:'Active'},{department_name:1})
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
    dep.findOne({department_name:req.body.department_name},{upsert:true})
    .populate('disease','disease_name')
    .exec((err,listDes)=>{
        if(err || !listDes){
            res.json({code:400,msg:'disease list not found'})
        }
        else{
            res.json({code:200,msg:listDes})
        }
    })
}