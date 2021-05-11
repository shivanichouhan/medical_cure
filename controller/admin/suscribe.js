
const email = require("../../otp")
const Suscribe = require("../../model/admin/suscribe")
const Suscribe_mitra = require("../../model/admin/suscribe_doc_mitra")
const Suscribe_doctor = require("../../model/admin/suscribe_doctor")

exports.sendEmail = async(req,res)=>{
    console.log(req.body)
    var userEmail = await Suscribe.findOne({suscribe_email:req.body.suscribe_email})
    if(userEmail){
        res.json({code:400,msg:'this email id already suscribe '})
    }
    else{
        email.suscribe_mail(req.body.suscribe_email).then(async(Result)=>{
            console.log(Result)
            // var suscribeObj = new Suscribe(req.body)
            // suscribeObj.suscribe_from = 'home'
            // var data = await suscribeObj.save()
            // if(data){
            //     res.json({code:200,msg:'suscribe successfully'})
            // }
            // else{
            //     res.json({code:400,msg:'suscribe not save'})
            // }
    
        }).catch((error)=>{
            console.log(error)
            res.json({code:400,msg:'email not sent'})
        })
    }
}

exports.doctor_mirta_suscribe = async(req,res)=>{
    var userEmail = await Suscribe_mitra.findOne({suscribe_email:req.body.suscribe_email})
    if(userEmail){
        res.json({code:400,msg:'this email id already suscribe '})
    }
    else{
    email.suscribe_doctor_mitra(req.body.suscribe_email).then(async(Result)=>{
        var suscribe_mitra = new Suscribe_mitra(req.body)
        var data = await suscribe_mitra.save()
        if(data){
            res.json({code:200,msg:'doctor mitra suscribe successfully'})
        }
        else{
            res.json({code:400,msg:'doctor mitra suscribe not save'})
        }

    }).catch((error)=>{
        res.json({code:200,msg:'email not sent'})
    })
}
}

exports.doctor_suscribe = async(req,res)=>{
    var userEmail = await Suscribe_doctor.findOne({suscribe_email:req.body.suscribe_email})
    if(userEmail){
        res.json({code:400,msg:'this email id already suscribe '})
    }
    else{
    email.suscribe_doctor(req.body.suscribe_email).then(async(Result)=>{
        var suscribeDoc = new Suscribe_doctor(req.body)
        var data = await suscribeDoc.save()
        if(data){
            res.json({code:200,msg:'doctor suscribe successfully'})
        }
        else{
            res.json({code:400,msg:'doctor suscribe not save'})
        }

    }).catch((error)=>{
        res.json({code:200,msg:'email not sent'})
    })
}
}