const e = require("express")
const blogCat = require("../../model/admin/blog_cat")
const blogSubCat = require("../../model/admin/blog_sub_cat")

exports.create_subcat_blog =(req,res)=>{
    console.log(req.body)
    var subCatObj = new blogSubCat(req.body)
    subCatObj.save((err,subCat)=>{
        if(err){
            res.json(err)
        }
        else{
            console.log(subCat)
            blogCat.updateOne({blog_cat_name:req.body.blog_cat_name},{$push:{blog_subcategory:subCat._id}},
                (err,resp)=>{
                    if(err){
                        res.json(err)
                    }
                    else{
                        
                        res.json(subCat)
                    }
              })
        }
    })
}

exports.edit_subcat_blog =(req,res)=>{
    blogSubCat.updateOne({_id:req.params.subcatId},req.body,(err,updtesub)=>{
        if(err){
            res.json(err)
        }
        else{
            res.json(updtesub)
        }
    })
}

exports.remove_subcat_blog =(req,res)=>{
        blogSubCat.remove({_id:req.params.subcatId},(err,removeSubCat)=>{
            if(err){
                res.json(err)
            }
            else{
                res.json(removeSubCat)
            }
        })
}