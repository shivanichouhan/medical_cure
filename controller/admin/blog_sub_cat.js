const e = require("express")
const blogCat = require("../../model/admin/blog_cat")
const blogSubCat = require("../../model/admin/blog_sub_cat")

exports.list_subcat_blog =(req,res)=>{
    blogCat.find({blog_cat_name:req.body.blog_cat_name})
    .select('blog_cat_name')
    .populate('blog_subcategory','blog_sub_cat')
    .exec((err,resp)=>{
        if(err || !resp){
            res.json({code:400,msg:'blog subcategory list not found'})
        }
        else{
            res.json({code:200,msg:resp})
        }
    })
}

exports.create_subcat_blog =(req,res)=>{
    console.log(req.body)
    var subCatObj = new blogSubCat(req.body)
    subCatObj.save((err,subCat)=>{
        if(err){
            res.json({code:400,msg:'blog subcategory not add'})
        }
        else{
            console.log(subCat)
            blogCat.updateOne({blog_cat_name:req.body.blog_cat_name},{$push:{blog_subcategory:subCat._id}},
                (err,resp)=>{
                    if(err){
                        res.json(err)
                    }
                    else{
                        
                        res.json({code:200,msg:subCat})
                    }
              })
        }
    })
}

exports.edit_subcat_blog =(req,res)=>{
    blogSubCat.updateOne({_id:req.params.subcatId},req.body,(err,updtesub)=>{
        if(err){
            res.json({code:400,msg:'blog subcategory not update'})
        }
        else{
            res.json({code:200,msg:'blog subcategory update'})
        }
    })
}

exports.remove_subcat_blog =(req,res)=>{
        blogSubCat.remove({_id:req.params.subcatId},(err,removeSubCat)=>{
            if(err){
                res.json({code:400,msg:'blog subcategory not remove'})
            }
            else{
                res.json({code:200,msg:'blog subcategory remove'})
            }
        })
}