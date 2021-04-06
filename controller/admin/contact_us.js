const contact = require("../../model/admin/contact_us")


exports.contact= (req,res)=>{
    console.log(req.body)
    var conObj = new contact(req.body)
    console.log(conObj)
    conObj.save((err,con)=>{
        if(err){
            res.json(err)
        }
        else{
            res.send(con)
        }
    })
}