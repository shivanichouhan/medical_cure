const depart = require("../../../model/admin/department/departments")

exports.list_dep =(req,res)=>{
    depart.find().exec((err,depList)=>{
        if(err){
            res.json(err)
        }
        else{
            res.json(depList)
        }
    })
}

exports.create_dep =(req,res)=>{
    var departObj = new depart(req.body)
    departObj.save((err,resp)=>{
        if(err){
            res.json(err)
        }
        else{
            res.json(resp)
        }
    })
}

exports.edit_dep =(req,res)=>{
    depart.updateOne({_id:req.params.depId},req.body,(err,depUpdate)=>{
        if(err){
            res.json(err)
        }
        else{
            res.json(depUpdate)
        }
    })
}

exports.remove_dep =(req,res)=>{
    depart.remove({_id:req.params.depId},(err,depRemove)=>{
        if(err){
            res.json(err)
        }
        else{
            res.json(depRemove)
        }
    })
}