const lab = require("../../../model/admin/investigation_daignosic/lab")

exports.list_lab =(req,res)=>{
    lab.find().exec((err,lab_list)=>{
        if(err){
            res.json({code:400,msg:'lab list not found'})
        }
        else{
            res.json({code:200,msg:lab_list})
        }
    })
}

exports.add_lab =(req,res)=>{
    var labObj = new lab(req.body)
    labObj.save((err,resp)=>{
        if(err){
            res.json({code:400,msg:'lab is not add'})
        }
        else{
            res.json({code:200,msg:resp})
        }
    })
}

exports.edit_lab =(req,res)=>{
    lab.updateOne({_id:req.params.labId},req.body,(err,resp)=>{
        if(err){
            res.json({code:400,msg:'lab details not update'})
        }
        else{
            res.json({code:200,msg:'lab details update'})
        }
    })
}

exports.remove_lab =(req,res)=>{
    lab.remove({_id:req.params.labId},(err,resp)=>{
        if(err){
            res.json({code:400,msg:'lab is not remove'})
        }
        else{
            res.json({code:200,msg:'lab is remove'})
        }
    })
}