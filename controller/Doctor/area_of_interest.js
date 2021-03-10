const area = require("../../model/admin/department/departments")

exports.depList =(req,res)=>{
     area.find()
    .select('department_name')
    .exec((err,list_dep)=>{
        if(err){
            res.json({code:400,msg:'department list not found'})
            console.log(err)
        }
        else{
            res.json({list:list_dep})
        }
    })
}

exports.list =(req,res)=>{
    area.find({department_name:req.body.department_name},{upsert:true})
    .populate('disease','disease_name')
    .exec((err,list_Dis)=>{
        if(err){
            res.json({code:400,msg:'disease list not found'})
            console.log(err)
        }
        else{
            res.json({list:list_Dis})
        }
    })
}

