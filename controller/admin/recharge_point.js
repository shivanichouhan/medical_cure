var recharge =  require("../../model/helth_worker/recharge_wallet")
var user = require("../../model/helth_worker/users")

exports.rechargeList = async(req,res)=>{
    var data = await recharge.find()
    try{
        if(data.length >0){
        res.send({code:200,msg:data})
    }else{
        res.send({code:200,msg:'recharge list is empty'})
      }
    }catch(e){
        console.log(e)
        res.send({code:400,msg:'recharge list not found'})
    }
}

exports.rechageRemove = (req,res)=>{
    recharge.remove({_id:req.params.rechageId}).exec((err,resp)=>{
        if(err){
            res.send({code:400,msg:'recharge data not remove'})
        }
        else{
            res.send({code:200,msg:'recharge data is remove successfully'})
        }
    })
}

exports.multipal_recharge_remove = (req,res)=>{
    var Id = req.body.rechageId
    console.log(Id)
    recharge.deleteMany({_id:Id}).exec((err,resp)=>{
        if(err){
            res.send({code:400,msg:'recharge data not remove'})
        }
        else{
            res.send({code:200,msg:'recharge data is remove successfully'})
        }
    })
}

exports.rechargeInfo = async (req,res)=>{
    var health = await user.findOne({_id:req.params.helthworker_id})
    console.log(health)
    if(health){
        res.send({code:200,msg:health})
    }else{
        res.send({code:400,msg:'this user data not found'})
    }
}