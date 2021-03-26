const docReg = require("../../../model/Doctor/doctor_regis")
const cloud = require("../../../cloudinary")
const fs = require("fs") 
const path = require("path")
const bcrypt = require('bcryptjs')

async function hashPassword(password) {
    return await bcrypt.hash(password, 10)
}


exports.doc_signup = async(req,res)=>{
    console.log(req.body)
    const { first_name,last_name,username,email,password} = req.body;

    const hashedPassword = await hashPassword(password)
    const data_check = await docReg.findOne({ email: email })
    if (!data_check) {
        const datas = new docReg({
            first_name: first_name,
            last_name: last_name,
            username:username,
            email:email,
            password: hashedPassword
        })
        datas.save()
            .then((resp) => {
                res.json({ code: 200, msg: resp })
            })

    } else {
        res.json({ code: 200, msg: "Email already exist" })
    }

}

exports.reg_doctor = async(req,res)=>{
     docReg.findOne({mobile_number:req.body.mobile_number})
     .exec((err,resp)=>{
         if(err){
             res.send({code:400,msg:'data not found'})
         }
         else{
             if(resp.register == 1){
                res.send({code:400,msg:'doctor already register'})
             }
             else{
                docObj.save(async(err,regDoc)=>{
                    if(err){
                        res.json({code:400,msg:'doctor details not save'})
                    }
                    else{
                        if(req.files){
                        //    const doc_cer = req.files.certificate_Img
                           const lic_front = req.files.License_img_front_side
                           const lic_back = req.files.License_img_back_side
                        //    const doc_pass_cer = req.files.passing_year_certificate
                           const identity_front = req.files.identity_front_side_img
                           const identity_back = req.files.identity_back_side_img
           
                        //    const docreg = async (path)=> await cloud.doctor_reg(path)
                           const front_lic = async (path)=> await cloud.licence_front(path)
                           const back_lic = async (path)=> await cloud.licence_back(path)
                        //    const pass_certificate = async (path)=> await cloud.doc_pass(path)
                           const identiy_front = async (path)=> await cloud.iden_front(path)
                           const identiy_back = async (path)=> await cloud.iden_back(path)
           
                        //    const p1 =doc_cer[0].path
                           const p2 =lic_front[0].path
                           const p3 =lic_back[0].path
                        //    const p4 =doc_pass_cer[0].path
                           const p5 =identity_front[0].path
                           const p6 =identity_back[0].path
                           
                        //    const url_cer = await docreg(p1)
                           const lice_front = await front_lic(p2)
                           const lice_back = await back_lic(p3)
                        //    const url_pass = await pass_certificate(p4)
                           const iden_front = await identiy_front(p5)               
                           const iden_back = await identiy_back(p6)                              
           
                           console.log(lice_front,lice_back,iden_front,iden_back)
                        //    fs.unlinkSync(p1)
                           fs.unlinkSync(p2)
                           fs.unlinkSync(p3)
                        //    fs.unlinkSync(p4)
                           fs.unlinkSync(p5)
                           fs.unlinkSync(p6)
           
                           docReg.findByIdAndUpdate(regDoc._id,{$push:{
                               License_img_front_side:lice_front,
                               License_img_back_side:lice_back,
                               identity_front_side_img:iden_front,
                               identity_back_side_img:iden_back
                           },$set:{register:1}}).exec((err,resDoc)=>{
                               if(err){
                                   res.send({code:400,msg:'images not add in doctor'})
                               }
                               else{
                                   res.send({code:200,data:resDoc})
                               }
                           })
                        }
                        else{
                            res.send({code:200,data:regDoc})
                        }
                    }
                })
             }
         }
     })   
}

exports.list_doctor =(req,res)=>{
    docReg.find().exec((err,doctor_list)=>{
        if(err){
            res.json({code:400,msg:'doctor list not found'})
        }
        else{
            res.json({code:200,msg:doctor_list})
        }
    })
}

exports.edit_doctor =(req,res)=>{
    docReg.updateOne({_id:req.params.doctorId},req.body)
    .exec((err,resp)=>{
        if(err){
            res.json(err)
        }
        else{
            if(req.file){

            }   
            else{
                res.json(resp)
            }
        }
    })
}

exports.status_manage =(req,res)=>{
    if(req.body.status === 0){
        docReg.updateOne({_id:req.body.doctorId},{$set:{status:1}},(err,resp)=>{
            if(err){
                res.json(err)
            }
            else{
                res.json(resp)
            }
        })
    }
    else if(req.body.status === 1){
        docReg.updateOne({_id:req.body.doctorId},{$set:{status:0}},(err,resp)=>{
            if(err){
                res.json(err)
            }
            else{
                res.json(resp)
            }
        })
    }
}

exports.remove_doctor =(req,res)=>{
    docReg.remove({_id:req.params.doctorId},(err,removeDoc)=>{
        if(err){
            res.json(err)
        }
        else{
            res.json(removeDoc)
        }
    })
}