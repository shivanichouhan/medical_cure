const fees = require("../../model/admin/fees_master")

exports.fees_list =(req,res)=>{
    fees.find().exec((err,resp)=>{
        if(err){
            res.json({code:400,msg:'fees list not found'})
        }
        else{
            res.json({code:200,msg:resp})
        }
    })
}

exports.fess_add = (req,res)=>{
    var feesObj = new fees(req.body)
    feesObj.save((err,resp)=>{
        if(err){
            res.json({code:400,msg:'fees not add'})

        }
        else{
            res.json({code:200,msg:resp})
        }
    })
}

exports.fees_edit =(req,res)=>{
    fees.updateOne({_id:req.params.feesId},req.body,(err,resp)=>{
        if(err){
            res.json({code:400,msg:'fees not edit'})
        }
        else{
            res.json({code:200,msg:'fees is update'})
        }
    })
}

exports.fees_remove =(req,res)=>{
    fees.remove({_id:req.params.feesId},(err,resp)=>{
        if(err){
            res.json({code:400,msg:'fees not remove'})
        }
        else{
            res.json({code:200,msg:'fees is remove'})
        }
    })
}