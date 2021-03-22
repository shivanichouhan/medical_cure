const specialist = require("../../model/admin/add_specialist")
const cloud = require("../../cloudinary")
const dotenv =require('dotenv')
const fs = require('fs')
dotenv.config()

exports.list_specilist =(req,res)=>{
    specialist.find().exec((err,resp)=>{
        if(err || !resp){
            res.json({code:400, msg:'specialist not found'})
        }
        else{
            res.json({data:resp})
        }
    })
}

exports.create =(req,res)=>{
    var specialObj = new specialist(req.body)
    specialObj.save((err,sp)=>{
        if(err){
            res.json(err)
        }
        else{
            if(req.file){
                const { path } = req.file
                cloud.specilist(path).then((resp)=>{
                fs.unlinkSync(path)
                specialist.findByIdAndUpdate({_id:sp._id},{$set:{ specialist_img:resp.url}})
                .then((response) => {
                       res.send(response)
                  }).catch((error)=>{
                      res.send({code:400,msg:"image is not save"})
                      console.log(error)
                  });
                }).catch((err)=>{
                    res.send({code:400,msg:'image url not create'})
                })
            }
        }
    })
}

exports.edit_specilist =(req,res)=>{
    specialist.findByIdAndUpdate({_id:req.params.specialistId},req.body)
    .exec((err,resp)=>{
        if(err){
            res.json({code:400,msg:'specialist not update'})
        }
        else{
            if(req.file){
                const { path } = req.file
                cloud.specilist(path).then((resp)=>{
                specialist.findByIdAndUpdate({_id:req.params.specialistId},{$set:{ specialist_img:resp.url}})
                .then((response)=>{
                       res.send({code:200,msg:'specialist upadte with img successfully'})
                }).catch((error)=>{
                         res.send({code:400,msg:"image is not save"})
                         console.log(error)
                });
                }).catch((err)=>{
                    res.send({code:400,msg:'image url not create'})
                }) 
            }
           else{
               res.json({code:200,msg:'specialist detail upadte successfully'})
           } 
        }
    })
}

exports.remove_specilist =(req,res)=>{
    specialist.remove({_id:req.params.specialistId},(err,delSp)=>{
        if(err){
            res.json({code:400,msg:'specialist not remove'})
        }
        else{
            res.json({code:200,msg:'specialist is remove successfully'})
        }
    })
}