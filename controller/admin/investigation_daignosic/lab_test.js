const labTest = require("../../../model/admin/investigation_daignosic/lab_test")
const Lab = require("../../../model/admin/investigation_daignosic/lab")

exports.list_test =(req,res)=>{
    labTest.find().then((resp)=>{
        res.json({code:200,msg:resp})
    }).catch((err)=>{
        res.json({code:400,msg:'lab test not found'})
    })
}

exports.add_test =(req,res)=>{
    var labObj = new labTest(req.body)
    labObj.save((err,resp)=>{
        if(err){
            res.json({code:400, msg:'lab test not add'})
        }
        else{
            Lab.updateOne({name:req.body.lab_name},{$push:{test_lab:resp._id}},
            (err,respL)=>{
                if(err){
                    res.json({code:400,msg:'lab test is not add in lab'})
                }
                else{
                    res.json({code:200,msg:resp})
                }
            })
        }
    })
}

exports.edit_test =(req,res)=>{
    labTest.updateOne({_id:req.params.testId},req.body,(err,testUpdate)=>{
        if(err){
            res.json({code:400,msg:'lab test not update'})
        }
        else{
            res.json({code:200,msg:'lab test update'})
        }
    })
}

exports.remove_test =(req,res)=>{
    labTest.remove({_id:req.params.testId},(err,del_test)=>{
        if(err){
            res.json({code:400,msg:'lab test not remove'})
        }
        else{
            res.json({code:200,msg:'lab test remove'})
        }
    })
}

exports.status_testLab =(req,res)=>{
    if(req.body.test_status == 'Active'){
        labTest.updateOne({_id:req.params.lab_testId},{$set:{status:'Deactive'}},
        (err,resp)=>{
            if(err){
                res.json({code:400,msg:'lab status is not update'})
            }
            else{
                res.json({code:200,msg:'lab status is update'})
            }
        })
    }
    else if(req.body.test_status == 'Deactive'){
        labTest.updateOne({_id:req.params.lab_testId},{$set:{status:'Active'}},
        (err,resp)=>{
            if(err){
                
                res.json({code:400,msg:'lab status is not update'})
            }
            else{
                res.json({code:200,msg:'lab status is update'})
            }
        })
    }
}
