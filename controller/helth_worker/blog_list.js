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