const comision = require("../../model/admin/comission")

exports.list_comission = (req,res)=>{
    comision.find().exec((err,resp)=>{
        if(err){
            res.json({code:400,msg:'comission list not found'})
        }
        else{
            res.json({code:200,msg:resp})
        }
    })
}

exports.add_comission = (req,res)=>{
    var comisionObj = new comision(req.body)
    comisionObj.save((err,resp)=>{
        if(err){
            res.json({code:400,msg:'comission not add'})
        }
        else{
            res.json({code:200,msg:'comission add successfully'})
        }
    })
}

exports.edit_comission = (req,res)=>{
    comision.updateOne({_id:req.params.comisionId},req.body,(err,resp)=>{
        if(err){
            res.json({code:400,msg:'comission is not update'})
        }
        else{
            res.json({code:200,msg:'comission is update'})
        }
    })
}

exports.remove_comission = (req,res)=>{
    comision.remove({_id:req.params.comisionId},(err,resp)=>{
        if(err){
            res.json({code:400,msg:'comission is not remove'})
        }
        else{
            res.json({code:200,msg:'comission is remove'})
        }
    })
}