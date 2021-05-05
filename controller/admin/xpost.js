const xPost = require("../../model/admin/xpost")
const cloud = require("../../cloudinary")
const fs = require('fs')

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