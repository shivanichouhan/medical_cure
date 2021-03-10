const state = require("../../model/helth_worker/city_list")

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
            res.json(err)
        }
        else{
            res.json({'state':st})
        }
    })
}
 
exports.list_district =(req,res)=>{
    state.find({State:req.body.State})
    .select('District')
    .exec((err,dis)=>{
        if(err){
            res.json(err)
        }
        else{
            res.json({'district':dis})
        }
    })
}

