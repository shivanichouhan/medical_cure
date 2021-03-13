const docDeg = require("../../model/Doctor/certificate")
const docPg = require("../../model/Doctor/postgraduate")
const docSuper = require("../../model/Doctor/super_specilist")

exports.addUg = (req,res)=>{
    
}

exports.add_super =(req,res)=>{
    var superObj = new docSuper(req.body)
    superObj.save((err,data)=>{
        if(err){
            res.json(err)
        }
        else{
            res.json(data)
        }
    })
}

exports.addPg =(req,res)=>{
    var pgObj = new docPg(req.body)
    pgObj.save((err,data)=>{
        if(err){
            res.json(err)
        }
        else{
            res.json(data)
        }
    })
}

exports.addCer =(req,res)=>{
    var docObj = new docDeg(req.body)
    docObj.save((err,data)=>{
        if(err){
            res.json(err)
        }
        else{
            res.json(data)
        }
    })
}

exports.list_pg =(req,res)=>{
    docPg.find()
    .exec((err,pgList)=>{
        if(err || !pgList){
            res.json({code:400,msg:'list not found'})
        }
        else{
            res.json({code:200,List:pgList})
        }
    })
}

exports.list_super =(req,res)=>{
    docSuper.find()
    .exec((err,superList)=>{
        if(err || !superList){
            res.json({code:400,msg:'list not found'})
        }
        else{
            res.json({code:200,List:superList})
        }
    })
}

exports.list_cer =(req,res)=>{
    docDeg.find()
    .exec((err,ugList)=>{
        if(err || !ugList){
            res.json({code:400,msg:'list not found'})
        }
        else{
            res.json({code:200,List:ugList})
        }
    })
}