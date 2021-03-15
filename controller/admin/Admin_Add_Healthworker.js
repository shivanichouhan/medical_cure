const HealthWorker = require('../../model/helth_worker/users');
const cloud = require("../../cloudinary")
const fs = require('fs')

exports.Add_Health_Worker = async (req, res) => {
   var health = await HealthWorker.find({mobile:req.body.mobile}) 
   if(health.length === 0){
   var healthObj = new HealthWorker(req.body)
   healthObj.save(async(err,data)=>{
       if(err){
           res.json({err})
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
            HealthWorker.findByIdAndUpdate(data._id,{$set:{certificate_img: urlsF, clinic_img: urlsS}})
             .exec((err,healthWorker)=>{
                 if(err){
                     res.json(err)
                 }
                 else{
                     res.json({msg:'health worker register with image',data:healthWorker})
                 }
             })
   
     }
     else{
             res.json({msg:'health worker register successfully',data:data})
        }
     }
   })
  }
  else{
      res.json({code:400,msg:'this mobile no already exist'})      
    }
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
