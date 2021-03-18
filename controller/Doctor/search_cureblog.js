const ListCure = require("../../model/admin/marketing/cure_blog")
const dis = require("../../model/admin/add_disease")
const url = require('url')

exports.cureBlogList =(req,res)=>{
    console.log(req.query,'fssss')
    console.log(req.body.title)
    var regex = new RegExp('^'+req.body.title,'i');
    console.log(regex)
    ListCure.find({title:regex},).exec((err,resp)=>{
        if(err){
            res.json({code:400, msg:'list not found'})
        }
        else{
            res.send({code:200,msg:resp})
        }
    })
}

exports.spec_dis_list =(req,res)=>{
    var regex = new RegExp('^'+req.body.search,'i');
    dis.find({$or:[{department_name:regex},{disease_name:regex}]})
    .select('department_name')
    .select('disease_name')
    .select('icon')
    .exec((err,data)=>{
        if(err || !data){
            res.json({code:400, msg:'specilist not found'})
        }
        else{
            res.json({code:200,msg:data})
        }
    })
}