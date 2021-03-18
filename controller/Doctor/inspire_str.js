const inspire = require("../../model/admin/inspire")

exports.list_insprire =(req,res)=>{
    inspire.find().exec((err,resp)=>{
        if(err || !resp){
            res.json({code:400,msg:'inspire story not found'})
        }
        else{
            res.json({code:200, msg:resp})
        }
    })

}