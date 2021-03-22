const state = require("../../model/admin/state_city/city_list")

exports.district_add = (req,res)=>{
    var stateObj = new state(req.body)
    stateObj.save((err,resp)=>{
        if(err){
            res.json(err)
        }
        else{
            res.json({data:resp})
        }    
    })
}

exports.list_state = (req,res)=>{
    state.distinct('State')
    .exec((err,st)=>{
        if(err){
            res.json({code:400,msg:'state list not found'})
        }
        else{
            res.json({code:200,'state':st})
        }
    })
}
 
exports.list_district =(req,res)=>{
    state.find({State:req.body.State})
    .select('District')
    .exec((err,dis)=>{
        if(err){
            res.json({code:400, msg:'district list not found'})
        }
        else{
            res.json({code:200,'district':dis})
        }
    })
}

