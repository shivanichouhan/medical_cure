const lab = require("../../../model/admin/investigation_daignosic/lab_test")

exports.list_test =(req,res)=>{
    lab.find().then((resp)=>{
        res.json({list:resp})
    }).catch((err)=>{
        res.json(err)
    })
}

exports.add_test =(req,res)=>{
    var labObj = new lab(req.body)
    labObj.save((err,resp)=>{
        if(err){
            res.json(err)
        }
        else{
            res.json(resp)
        }
    })
}

exports.edit_test =(req,res)=>{
    lab.updateOne({_id:req.params.testId},req.body,(err,testUpdate)=>{
        if(err){
            res.json(err)
        }
        else{
            res.json(testUpdate)
        }
    })
}

exports.remove_test =(req,res)=>{
    lab.remove({_id:req.params.testId},(err,del_test)=>{
        if(err){
            res.json(err)
        }
        else{
            res.json(del_test)
        }
    })
}
