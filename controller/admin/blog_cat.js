const { model } = require("mongoose")
const blogCat = require("../../model/admin/blog_cat")

exports.list_cat_blog =(req,res)=>{
    blogCat.find()
    .populate({
        path:'blog_subcategory',
        model:'blog_sub_category'
    , populate:{
        path:'blogs',
        model:'blog'
    }
    })
    .exec((err,catList)=>{
        if(err){
            res.json(err)
        }
        else{
            res.json(catList)
        }
    })
}

exports.create_cat_blog =(req,res)=>{
    console.log(req.body)
    var blogObj = new blogCat(req.body)
    blogObj.save((err,blog_cat)=>{
        if(err){
            res.json(err)
        }
        else{
            res.json(blog_cat)
        }
    })
}

exports.edit_cat_blog =(req,res)=>{
    blogCat.updateOne({_id:req.params.catId},req.body,(err,resp)=>{
        if(err){
            res.json(err)
        }
        else{
            res.json(resp)
        }
    })
}

exports.remove_cat_blog =(req,res)=>{
    blogCat.remove({_id:req.params.catId},(err,resp)=>{
        if(err){
            res.json(err)
        }
        else{
            res.json(resp)
        }
    })
}