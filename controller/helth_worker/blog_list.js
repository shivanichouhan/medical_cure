const Blog = require("../../model/admin/blog")

exports.list_blog =(req,res)=>{
    Blog.findOne()
    .exec((err,catList)=>{
        if(err){
            res.json(err)
        }
        else{
            res.json({msg:catList})
        }
    })
}

exports.pertucularBlog = (req,res)=>{
    const blogId =req.params.blog_id
    Blog.findOne({_id:blogId})
    .exec((err,catList)=>{
        if(err){
            res.json(err)
        }
        else{
            res.json({msg:catList})
        }
    })

}