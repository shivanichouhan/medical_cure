const blog_child = require("../../model/admin/blog_child_cat")
const blog_sub = require("../../model/admin/blog_sub_cat")

exports.list_child_cat =(req,res)=>{
    blog_sub.find({blog_sub_cat:req.body.blog_sub_cat})
    .select('blog_sub_cat')
    .populate('blog_child_cat','blog_child_cat')
    .exec((err,resp)=>{
        if(err){
            res.json({code:400,msg:'child category not found'})
        }
        else{
            res.json({code:200,msg:resp})
        }
    })
}

exports.create_child_cat =(req,res)=>{
    var childObj = new blog_child(req.body)
    childObj.save((err,resp)=>{
        if(err){
            res.json({code:400,msg:'child category not create'})
        }
        else{
            blog_sub.updateOne({blog_sub_cat:req.body.blog_sub_cat},{$push:{blog_child_cat:resp._id}},
             (err,subcat)=>{
                 if(err){
                     res.json({code:400,msg:'child_category not add subcategory'})
                 }
                 else{
                     res.json({code:200,msg:resp})   
                 }
             })
        }
    })
}

exports.edit_child_cat =(req,res)=>{
    blog_child.updateOne({_id:req.params.childCat},req.body,(err,resp)=>{
        if(err){
            res.json({code:400,msg:'child category not update'})
        }
        else{
            res.json({code:200,msg:'child category update'})
        }
    })
}

exports.remove_child_cat =(req,res)=>{
    blog_child.remove({_id:req.params.childCat},(err,delCat)=>{
        if(err){
            res.json({code:400,msg:'child category not remove'})
        }
        else{
            res.json({code:200,msg:'child category remove'})
        }
    })
}