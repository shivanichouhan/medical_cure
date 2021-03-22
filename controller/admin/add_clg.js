const clg = require("../../model/admin/clg_name")

exports.listClg =(req,res)=>{
    clg.find().exec((err,clgList)=>{
        if(err){
            res.json({code:400,msg:'collage list not found'})
        }
        else{
            res.json({code:200,msg:clgList})
        }
    })
}

exports.addClg =(req,res)=>{
    var clgObj = new clg(req.body)
    clgObj.save((err,resp)=>{
        if(err){
            res.json({code:400,msg:'collage not add'})
        }
        else{
            res.json({code:200,msg:resp})
        }
    })
}

exports.editClg =(req,res)=>{
    clg.updateOne({_id:req.params.clgId},req.body,(err,resp)=>{
        if(err){
            res.json({code:400,msg:'collage is not update'})
        }
        else{
            res.json({code:200,msg:'collage is update successfully'})
        }
    })
}

exports.removeClg =(req,res)=>{
    clg.remove({_id:clgId},(err,resp)=>{
        if(err){
            res.json({code:400,msg:'collage is not remove'})
        }
        else{
            res.json({code:200,msg:'collage is remove succcessfully'})
        }
    })
}

