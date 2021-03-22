const city = require("../../../model/admin/state_city/city_list")

exports.addCity = (req,res)=>{
    var cityObj = new city(req.body)
    cityObj.save((err,resp)=>{
        if(err){
            res.json({code:400,msg:'city is not add'})
        }
        else{
            res.json({code:200,msg:resp})
        }
    })
}

exports.listCity=  (req,res)=>{
  city.find({},{District:1}).exec((err,resp)=>{
      if(err){
            res.json({code:400,msg:'city list not found'})
      }
      else{
          res.json({code:200,msg:resp})
      }
  })
}

exports.editCity= (req,res)=>{
    city.updateOne({_id:req.params.cityId},{District:req.body.city},(err,resp)=>{
        if(err){
            res.json({code:400,msg:'city is not update'})
        }
        else{
            res.json({code:200,msg:'city is update'})
        }
    })
}

exports.removeCity =(req,res)=>{
    city.remove({_id:req.params.cityId},(err,resp)=>{
        if(err){
            res.json({code:400,msg:'city is not remove'})
        }
        else{
            res.json({code:200,msg:'city is remove successfully'})
        }
    })
}