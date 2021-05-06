const xPost = require("../../model/admin/xpost")
const cloud = require("../../cloudinary")
const fs = require('fs')

exports.listXpost = (req,res)=>{
    xPost.find().exec((err,resp)=>{
        if(err){
            res.send({code:400,msg:'xpost list not found'})
        }
        else{
            res.send({code:200,msg:resp})
        }
    })
}

exports.listXpost_doc = (req,res)=>{
    xPost.find().exec((err,resp)=>{
        if(err){
            res.json({code:400,msg:'xpost list not found'})
        }
        else{
            res.json({code:200,msg:resp})
        }
    })
}

exports.xpostAdd =(req,res)=>{
    var xpostObj = new xPost({
        title:req.body.title,
        discription:req.body.discription
    })
    xpostObj.save((err,resp)=>{
        if(err){
            res.send({code:400,msg:'xpost is not add'})
        }else{
            if(req.file){
                const  { path } = req.file
                console.log(path,'path')
                cloud.xpost(path).then((xpostUrl)=>{
                    console.log(xpostUrl)
                    xPost.updateOne({_id:resp._id},{$set:{poster:xpostUrl.url}},(err,xpostData)=>{
                        if(err){
                            res.send({code:400,msg:'xpost img url not update in xpost'})
                        }else{
                            res.send({code:200,msg:'xpost add with poster'})
                        }
                    })
                }).catch((error)=>{
                    res.send({code:400,msg:'xpost poster img url not create'})
                })
            }
        }
    })
}

exports.editXpost = async(req,res)=>{
    var xpostData = await xpost.updateOne({_id:req.params.xpostId},{
        title:req.body.title,
        discription:req.body.discription
    })
    if(xpostData){
        if(req.file){
            const  { path } = req.file
            console.log(path,'path')
            cloud.xpost(path).then((xpostUrl)=>{
                console.log(xpostUrl)
                xPost.updateOne({_id:req.params.xpostId},{$set:{poster:xpostUrl.url}},(err,xpostData)=>{
                    if(err){
                        res.send({code:400,msg:'xpost img url not update in xpost'})
                    }else{
                        res.send({code:200,msg:'xpost details update with img'})
                    }
                })
            }).catch((error)=>{
                res.send({code:400,msg:'xpost poster img url not create'})
            })
        }else{
            res.send({code:400,msg:'xpost details update'})
        }
    }else{
        res.send({code:400,msg:'xpost details not update'})
    }
   
}

exports.remove_xpost = (req,res)=>{
    xPost.remove({_id:req.params.xpostId}).exec((err,resp)=>{
        if(err){
            res.send({code:400,msg:'xpost not remove'})
        }else{
            res.send({code:200,msg:'xpost remove successfully'})
        }
    })
}
