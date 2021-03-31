const HealthWorker = require('../../model/helth_worker/users');
const cloud = require("../../cloudinary")
const fs = require('fs')
const bcrypt = require('bcryptjs')

async function hashPassword(password) {
    return await bcrypt.hash(password, 10)
}

exports.health_signup = async(req,res)=>{

    const { first_name,mobile,email,password,course } = req.body;
    const hashedPassword = await hashPassword(password)
    const data_check = await HealthWorker.findOne({email: email})
    if (!data_check) {
        const data_mob = await HealthWorker.findOne({mobile: mobile})
        if(!data_mob){
            const datas = new HealthWorker({
                first_name: first_name,
                mobile:mobile,
                email:email,
                password: hashedPassword,
                health_worker_course:course
            })
            datas.save()
                .then((resp) => {
                    res.json({ code: 200, msg: resp })
                }).catch((err)=>{
                    res.json({code:400,msg:'health worker not signup'})
                })
        }
    else{
        res.json({ code: 400, msg: "Mobile already exist" })  
      }
        
    } else {
        res.json({ code: 400, msg: "Email already exist" })
    }
}

exports.Add_Health_Worker = async (req, res) => {
   HealthWorker.find({mobile:req.body.mobile})
   .exec((err,resp)=>{
       if(err){
           res.send({code:400,msg:'data not found'})
       }
       else{
           if(resp.register == "1"){
            res.send({code:400,msg:'data not found'})
           }
           else{
            var healthObj = new HealthWorker(req.body)
            healthObj.save(async(err,data)=>{
                if(err){
                    res.json({code:400,msg:'health worker is not add'})
                }
                else{
                    if(req.files){
                     var certificate = req.files.certificate
                     var clinic = req.files.clinic
                     
                     const uploaderF = async (path) => await cloud.Certificate(path, 'Certificates')
                     const uploaderS = async (path) => await cloud.Clinic(path, 'Clinics')
         
                     const urlsF = []
                     for (const fileF of certificate) {
                         const { path } = fileF
                         const newpathF = await uploaderF(path)
                         urlsF.push(newpathF)
                         fs.unlinkSync(path)
                     }
         
                     const urlsS = []
                     for (const fileS of clinic) {
                         const { path } = fileS
                         const newpathS = await uploaderS(path)
                         urlsS.push(newpathS)
                         fs.unlinkSync(path)
                     }
                     HealthWorker.findByIdAndUpdate(data._id,{$set:{certificate_img: urlsF,register:"1",clinic_img: urlsS}})
                      .exec((err,healthWorker)=>{
                          if(err){
                              res.json({code:400,msg:'images not add in healthworker'})
                          }
                          else{
                              res.json({code:200,msg:'health worker register with image',data:healthWorker})
                          }
                      })
            
              }
              else{
                      res.json({msg:'health worker register successfully',data:data})
                 }
              }
            })
           
           }
       }
   }) 
   
 }

exports.findhealthworker = async (req, res) => {
    try{
        const workersData = await HealthWorker.find({mobile_verfiy:1});
        res.send(workersData);
    }catch(e){
        res.send(e);
    }
};

exports.DeleteHealthworker = (req, res) => {
    HealthWorker.remove({_id:req.body._id},(err,resp)=>{
        if(err){
            res.json(err)
        }
        else{
            res.json(resp)
        }
    })
};

exports.helthworker_status = (req,res) =>{
    if(req.body.status == 1){
        HealthWorker.updateOne({_id:req.body._id},{$set:{status:'Active'}},(err,resp)=>{
            if(err){
                res.json(err)
            }
            else{
                res.json(resp)
            }
        })
    }
    else if(req.body.status == 0){
        HealthWorker.updateOne({_id:req.body._id},{$set:{status:'Inactive'}},(err,resp)=>{
            if(err){
                res.json(err)
            }
            else{
                res.json(resp)
            }
        })
    }
}
