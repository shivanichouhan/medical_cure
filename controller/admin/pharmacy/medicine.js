const medicine = require("../../../model/admin/pharmacy/medicine")
const cloud = require("../../../cloudinary")
const fs = require('fs')

exports.med_list =(req,res)=>{
    medicine.find().exec((err,List_med)=>{
        if(err){
            res.json(err)
        }
        else{
            res.json({list:List_med})
        }
    })
}

exports.med_add = async(req,res)=>{
    var medObj = new medicine(req.body)
    medObj.save(async(err,resp)=>{
        if(err){
            res.json({code:400,msg:'medicine data not add'})
        }
        else{
        if(req.files.length>0){
            const uploaderF = async (path) => await cloud.uploads(path)
            const urlsF = []
                    for (let fileF of req.files){
                    const { path } = fileF
                    const newpathF = await uploaderF(path)
                    urlsF.push(newpathF)
                    fs.unlinkSync(path)
                  }
                  medicine.findByIdAndUpdate({_id:resp._id},{$push:{med_img:urlsF}})
                 .exec((err,medUpdte)=>{
                      if(err){
                          res.json({code:400,msg:'medicine img not add'})
                      }
                      else{
                          res.json({code:200,msg:'medicine add with image'})
                      }
                  })
                }
              else{
                res.json({code:200,msg:'medicine add successfully'})
             }
        }
    })
}

exports.med_remove =(req,res)=>{
    console.log(req.params.medId)
    medicine.remove({_id:req.params.medId},(err,med_del)=>{
        if(err){
            res.json(err)
        }
        else{
            res.json(med_del)
        }
    })
}