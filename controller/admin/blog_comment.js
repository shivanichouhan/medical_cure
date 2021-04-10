const commentBlog = require("../../model/admin/blog_comment")
const blog = require("../../model/admin/blog")

exports.add_comment = (req,res)=>{
    var commentObj = new commentBlog(req.body)
    commentObj.save((err,resp)=>{
        if(err){
            res.json({code:400,msg:'comment is not add'})
        }
        else{
            blog.updateOne({_id:req.body.blogId},{$push:{comment:resp._id}},(err,resp)=>{
                if(err){
                    res.json({code:400,msg:'comment not add in blog'})
                }
                else{
                    res.json({code:200,msg:'comment add successfully'})
                }
            })
        }
    })
}