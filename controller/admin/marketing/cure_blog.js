const blog_cure = require("../../../model/admin/marketing/cure_blog")
const cloud = require("../../../cloudinary")
const fs = require('fs')

exports.list_cure_blog =(req,res)=>{
    blog_cure.find().exec((err,listCure)=>{
        if(err || !listCure){
            res.json({code:400,msg:'cure blog list not found'})
        }
        else{
            res.json({code:200,msg:listCure})
        }
    })
}

exports.add_cure_blog =(req,res)=>{
    var cureObj = new blog_cure(req.body)
    cureObj.save(async(err,resp)=>{
        if(err){
            res.json({code:400,msg:'blog details not add'})
            console.log(err)
        }
        else{
            if(req.files.length > 0){
                var cure_blog = req.files
                const cure_blogUpload = async (path)=> await cloud.cure_blogs(path)
                const Blog =[]
                for(const file of cure_blog){
                    const { path } =file
                    const newpathF = await cure_blogUpload(path)
                    Blog.push(newpathF)
                    fs.unlinkSync(path)
                }  
                console.log(Blog)
                blog_cure.findByIdAndUpdate({_id:resp._id},{$push:{blog_img:Blog}})
                .exec((err,blogUpdte)=>{
                    if(err){
                        res.json({code:400,msg:'img not add in blog'})
                    }
                    else{
                        res.json({code:200,msg:blogUpdte})
                    }
                })
            }
            else{
                res.json({code:200,msg:resp})
            }
        }
    })
}

exports.edit_cure_blog =(req,res)=>{
    blog_cure.findByIdAndUpdate(req.params.blogId,req.body).exec(async(err,resp)=>{
        if(err){
            res.json({code:400,msg:'blog detail not update'})
        }
        else{
            if(req.files.length>0){
                for(row of req.files.blog_img){
                    var p = row.path
                }
                const path = p
                cloud.cure_blogs(path).then((resp)=>{
                    console.log(resp)
                    blogModal.updateOne({'blog_img':req.body.imgId},{$set:{"blog_img.$.url":resp.url,"blog_img.$.imgId":resp.imgId}})
                    .exec((err,blogUpdte)=>{
                        if(err){
                            res.json({code:400,msg:'blog img is not update'})
                        }
                        else{
                            res.json({code:200,msg:'blog update with image'})
                        }
                    })
                }).catch((error)=>{
                        res.json({code:400,msg:'image url not create'})
                })
            }
            else{
                res.json({code:200,msg:'blog detail update successfully'})
            }
        }
    })
}

exports.remove_cure_blog =(req,res)=>{
    blog_cure.remove({_id:req.params.blogId},(err,delCure)=>{
        if(err){
            res.json({code:400,msg:'cure blog is not remove'})
        }
        else{
            res.json({code:200,msg:'cure blog remove successfully'})
        }
    })
}