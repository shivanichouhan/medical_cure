const blog_child = require("../../model/admin/blog_child_cat")
const blog_sub = require("../../model/admin/blog_sub_cat")

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
    
}