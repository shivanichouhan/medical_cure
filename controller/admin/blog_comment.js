const commentBlog = require("../../model/admin/blog_comment")
const blog = require("../../model/admin/blog")

exports.add_comment = (req,res)=>{
 function timeZone() {
  let options = {
     timeZone: 'Asia/Kolkata',hour: 'numeric',year: 'numeric',month: 'numeric',day: 'numeric',minute: 'numeric',second: 'numeric',
  },
    formatter = new Intl.DateTimeFormat([], options);
    var a =(formatter.format(new Date()));
    var str = a
    var h = str.split(",");
    return ({'date':h[0],'time':h[1]})

   }
   var Result =timeZone()
   console.log(Result)
   console.log(req.body)
   console.log(req.params)
   var commentObj = new commentBlog(req.body)
    commentObj.date = Result.date
    commentObj.time = Result.time
    console.log(commentObj)
    commentObj.save((err,resp)=>{
        if(err){
            res.json({code:400,msg:'comment is not add'})
        }
        else{
            blog.updateOne({_id:req.params.blogId},{$push:{comment:resp._id},$inc:{comment_count:1}},(err,resp)=>{
                if(err){
                    res.json({code:400,msg:'comment not add in blog'})
                    console.log(err)
                }
                else{
                    res.json({code:200,msg:'comment add successfully'})
                }
            })
        }
    })
}