const docDeg = require("../../model/Doctor/certificate")
const docPg = require("../../model/Doctor/postgraduate")
const docSuper = require("../../model/Doctor/super_specilist")
const specilization = require("../../model/admin/department/departments")
const clg = require("../../model/admin/clg_name")
const lic_auth = require("../../model/Doctor/medical_licence_auth")

exports.licence_Auth_Add = (req,res)=>{
    var licObj = new lic_auth(req.body)
    licObj.save((err,data)=>{
        if(err){
            res.json(err)
        }
        else{
            res.json(data)
        }
    })
}

exports.list_licence_auth =(req,res)=>{
    lic_auth.find()
    .exec((err,licList)=>{
        if(err || !licList){
            res.json({code:400,msg:'list not found'})
        }
        else{
            res.json({code:200,List:licList})
        }
    })
}

exports.list_specilization = (req,res)=>{
    specilization.find({},{department_name:1}).exec((err,resp)=>{
        if(err){
            res.json({code:400, msg:'list not found'})
        }
        else{
            res.json({code:200, List:resp})
        }   
    })
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

exports.clgAdd =(req,res)=>{
    var clgObj = new clg(req.body)
    clgObj.save((err,data)=>{
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

exports.list_clg =(req,res)=>{
    clg.find()
    .exec((err,clgList)=>{
        if(err || !clgList){
            res.json({code:400,msg:'list not found'})
        }
        else{
            res.json({code:200,List:clgList})
        }
    })
}
