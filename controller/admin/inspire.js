const ins = require("../../model/admin/inspire")
const cloud = require("../../cloudinary")
const fs = require('fs')

exports.add_inspire =(req,res)=>{
    console.log(req.body)
    var insObj = new ins(req.body)
    insObj.save((err,resp)=>{
        if(err){
            res.json({code:400,msg:'inspire story not add'})
        }
        else{
            if(req.file){
                var path = req.file.path
                cloud.uploads(path).then((data)=>{
                    fs.unlinkSync(path)
                    ins.findByIdAndUpdate(resp._id,{$set:{img :data.url}}).then((insUpdate)=>{
                        res.json({code:200,msg:insUpdate})
                    })
                }).catch((err)=>{
                    res.json({code:400,msg:'image url not create'})
                })
            }
            else{
                res.json({code:200,msg:resp})
            }
        }
    })
}

exports.edit_inspire =(req,res)=>{
    ins.findByIdAndUpdate(req.params.insId,req.body)
    .exec((err,resp)=>{
        if(err){
                res.json({code:400,msg:'inspire story not edit'})
        }
        else{
            if(req.file){
                var path = req.file.path
                cloud.uploads(path).then((data)=>{
                    fs.unlinkSync(path)
                    ins.findByIdAndUpdate(resp._id,{$set:{img :data.url}}).then((insUpdate)=>{
                        res.json({code:200,msg:'inspire story update with img'})
                    })
                }).catch((err)=>{
                    res.json({code:400,msg:'image url not create'})
                }) 
            }
            else{
                res.json({code:200,msg:'inspire story update'})  
            }
        }
    })
}

exports.remove_inspire =(req,res)=>{
    ins.remove({_id:req.params.insId},(err,delInspire)=>{
        if(err){
            res.json({code:400,msg:'inspire story not delete'})
        }
        else{
            res.json({code:200,msg:delInspire})
        }
    })    
}