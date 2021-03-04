const sub_category = require('../../model/admin/add_sub_category')
const Category = require("../../model/admin/add_category")

exports.create_sub_cat= (req,res)=>{
    var subcatObj = new sub_category(req.body)
    subcatObj.save((err,sub_cat)=>{
        if(err){
            res.json(err)
        }
        else{
            Category.findOneAndUpdate({category_name:req.body.category_name},{$push:{sub_category:sub_cat._id}},
                (err,resp)=>{
                    if(err){
                        res.json(err)
                    }
                    else{
                        res.json(sub_cat)
                    }
                })
        }
    })
}

exports.edit_sub_cat =(req,res)=>{
    console.log(req.params.subcatId)
    sub_category.updateOne({_id:req.params.subcatId},{$set:{sub_category:req.body.sub_category}},(err,sub_cat)=>{
        if(err){
            res.json(err)
        }
        else{
            res.json(sub_cat)
        }
    })
}

exports.remove_sub_cat =(req,res)=>{
    sub_category.deleteOne({_id:req.params.subcatId},(err,del_cat)=>{
        if(err){
            res.json(err)
        }
        else{
            res.json({code:200,resp:del_cat})
        }
    })
}