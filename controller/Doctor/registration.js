const Register = require('../../model/Doctor/doctor_regis')
const cloud = require("../../cloudinary")

exports.doctor_reg =(req,res)=>{
    var regisObj = new Register(req.body)
    regisObj.save((err,resp)=>{
        if(err){
            res.json(err)
        }
        else{
            res.json(resp)
        }
    })
}

exports.reg_list =(req,res)=>{
    //console.log(req.params._id)
    Register.findOne({_id:req.params.user_id})
    .exec((err,List)=>{
        if(err){
            res.json(err)
        }
        else{
          
            res.json(List)
        }
    })
}


exports.edit_regis_list =(req,res)=>{
    Register.findByIdAndUpdate({_id:req.params.user_id},req.body)
    .exec((err,updtedoctor)=>{
        if(err){
            res.json(err)
        }
        else{        
            if(req.files.length>0){
            for(row of req.files.certificate_Img){
                console.log("run")
                var p = row.path
            }
            const path = p
            cloud.certificate_Img(path).then((resp)=>{
                Register.updateOne({'certificate_Img':req.body.imgId},{$set:{"certificate_Img.$.url":resp.url,"certificate_Img.$.imgId":resp.imgId}})
                .exec((err,doctorUpdte)=>{
                    if(err){
                        res.json(err)
                    }
                    else{
                        res.json({updtedoctor})
                    }
                })
            }).catch((error)=>{
                    res.json(error)
            })
          }
          else{
              res.json({msg:'Doctor details updated successfully'})
          }
        } 
    })
}





