const fees = require("../../model/admin/fees_master")

exports.fess_add = (req,res)=>{
    var feesObj = new fees(req.body)
    feesObj.save((err,resp)=>{
        if(err){
            res.json({code:400,msg:'fees not add'})

        }
        else{
            res.json({code:200,msg:resp})
        }
    })
}