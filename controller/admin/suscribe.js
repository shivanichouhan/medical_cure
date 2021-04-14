
const email = require("../../otp")
const Suscribe = require("../../model/admin/suscribe")

exports.sendEmail = async(req,res)=>{
    email.suscribe_mail(req.body.suscribe_email).then(async(Result)=>{
        var suscribeObj = new Suscribe(req.body)
        var data = await suscribeObj.save()
        if(data){
            res.json({code:200,msg:'suscribe successfully'})
        }
        else{
            res.json({code:400,msg:'suscribe not save'})
        }

    }).catch((error)=>{
        res.json({code:200,msg:'email not sent'})
    })
}