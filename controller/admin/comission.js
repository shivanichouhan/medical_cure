const comision = require("../../model/admin/comission")

exports.add_comission = (req,res)=>{
   var comisionObj = new comision(req.body)
    comisionObj.save((err,resp)=>{
        if(err){
            res.json({code:400,msg:'comission not add'})
        }
        else{
            res.json({code:200,msg:'comission add successfully'})
        }
    })
}