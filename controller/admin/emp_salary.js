const salary = require("../../model/admin/emp_salary")

exports.list_sal =(req,res)=>{
    salary.find().exec((err,resp)=>{
        if(err){
            res.json({code:400,msg:'employee salary list not found'})
        }
        else{
            res.json({code:200,msg:resp})
        }
    })
}

exports.create_sal =(req,res)=>{
    var salObj = new salary(req.body)
    salObj.save((err,resp)=>{
        if(err){
            res.json({code:200,msg:'employee salary not create'})
        }
        else{
            res.json({code:400,msg:resp})
        }
    })
}

exports.edit_sal =(req,res)=>{
    salary.updateOne({_id:req.params.empId},req.body,(err,resp)=>{
        if(err){
            res.json({code:400,msg:'employee salary not update'})
        }
        else{
            res.json({code:200,msg:'employee salary update'})
        }
    })
}

exports.remove_sal =(req,res)=>{
    salary.remove({_id:req.params.empId},(err,resp)=>{
        if(err){
            res.json({code:400,msg:'employee salary not remove'})
        }
        else{
            res.json({code:200,msg:'employee salary remove'})
        }
    })
}