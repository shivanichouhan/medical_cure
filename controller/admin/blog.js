const blogModal = require("../../model/admin/blog")
const blogsubcat = require("../../model/admin/blog_sub_cat")
const cloud = require("../../cloudinary")
const fs = require('fs')
const url = require('url')

exports.blog_search = (req, res) => {
    console.log(req.body)
    var blog_name = new RegExp('^' + req.body.search, 'i');
    blogModal.find({ name: blog_name }).exec((err, resp) => {
        if (err) {
            res.json({ code: 400, msg: 'blog list not found' })
        }
        else {
            res.json({ code: 200, msg: resp })
        }
    })
}

exports.blogInfo = (req, res) => {
    const info = req.params.blogId
    console.log(info)
    blogModal.findOne({ _id: info })
        .populate('comment')
        .exec((err, resp) => {
            if (err) {
                res.send('blog details not found')
            }
            else {
                
                res.send(resp)
            }
        })
}

exports.list_blog = (req, res) => {
    blogModal.find().exec((err, blogList) => {
        if (err) {
            res.json(err)
        }
        else {
            res.json({ data: blogList })
        }
    });
}
//for admin
exports.lists_blogs = (req, res) => {
    blogModal.find().exec((err, blogList) => {
        if (err) {
            res.json(err)
        }
        else {
            res.send(blogList)
        }
    });
}

exports.home_pageBlog = (req,res)=>{
    blogModal.find().sort( { "createdAt": -1 } ).limit(3)
    .exec((err, blogList) => {
        if (err) {
            res.json(err)
        }
        else {
            res.json({ data: blogList })
        }
    });
}

exports.create_blog = (req, res) => {
    console.log(req.files.blog_img, req.files.thumb_img, req.files.blog_video)

    // if(Object.entries(req.files).length != 0){
    var blogObj = new blogModal(req.body)
    blogObj.save(async (err, resp) => {
        if (err) {
            res.json({ code: 400, msg: 'blog detail not add' })
        }
        else {
            // var BlogImg = []
            // if (req.files.blog_img) {
            //     const blogImg = async (path) => await cloud.Blogs(path)
            //     for (const FileF of req.files.blog_img) {
            //         const { path } = FileF
            //         const newpathF = await blogImg(path)
            //         BlogImg.push(newpathF)
            //         fs.unlinkSync(path)
            //     }
            // }

            // var BlogThumb = []
            // if (req.files.thumb_img) {
            //     const blogVT = async (path) => await cloud.videoImages(path)
            //     for (const FileT of req.files.thumb_img) {
            //         const { path } = FileT
            //         const newpathF = await blogVT(path)
            //         BlogThumb.push(newpathF)
            //         fs.unlinkSync(path)
            //     }
            // }

            // var BlogVideo = []
            // if (req.files.blog_video) {
            //     const blogV = async (path) => await cloud.videoUpload(path)
            //     for (const FileS of req.files.blog_video) {
            //         const { path } = FileS
            //         const newpathF = await blogV(path)
            //         BlogVideo.push(newpathF)
            //         fs.unlinkSync(path)
            //     }
            // }
            // console.log(BlogImg, BlogVideo)

            // blogModal.findByIdAndUpdate({ _id: resp._id }, { $push: { blog_img: BlogImg, video_file: BlogVideo, video_image: BlogThumb } })
            //     .exec((err, blogUpdte) => {
            //         if (err) {
            //             console.log(err, 'not upload')
            //             res.json({ code: 400, msg: 'img video not add in blog' })
            //         }
            //         else {
            //             blogsubcat.updateOne({ blog_sub_cat: req.body.blog_sub_cat }, { $push: { blogs: blogUpdte._id } },
            //                 (err, blogupdte) => {
            //                     if (err) {
            //                         ({ code: 400, msg: 'blog is not add subcategory' })
            //                     }
            //                     else {
            res.json({ code: 200, msg: 'blog add successfully' })
            //                 }
            //             })
            //     }
            // })
        }
    })

    // }
    // else{
    //     res.send({code:400,msg:'please send blog img or blog video'})
    // }

}

exports.edit_blog = (req, res) => {
    blogModal.findOneAndUpdate({_id:req.params.blogId},{
        name:req.body.name,
        status:req.body.status,
        discription:req.body.discription
    }).exec((err, updteBlog) => {
            if (err) {
                res.send({code:400,msg:'blog details not update'})
            }
            else {
                if (req.files) {
                    for (row of req.files.blog_img) {
                        var p = row.path
                    }
                    const path = p
                    cloud.uploads(path).then((resp) => {
                        console.log(resp,"images")
                        console.log(resp,"images")
                        const data = resp
                        blogModal.updateOne({ _id: req.params.blogId }, { $set:{blog_img:data } })
                            .exec((err, blogUpdte) => {
                                if (err) {
                                    res.json(err)
                                }
                                else {
                                    res.json({ updteBlog })
                                }
                            })
                    }).catch((error) => {
                        res.json(error)
                    })
                }
                else {
                    res.send({code:200,msg:'blog details update successfully'})
                }
            }
        })
}

exports.remove_blog = (req, res) => {
    blogModal.remove({ _id: req.params.blogId }, (err, del_blog) => {
        if (err) {
            res.json(err)
        }
        else {
            res.json(del_blog)
        }
    })
}

exports.blog_status = (req, res) => {
    if (req.body.status == 1) {
        blogModal.updateOne({ _id: req.body._id }, { $set: { status: 'Active' } }, (err, resp) => {
            if (err) {
                res.json(err)
            }
            else {
                res.json({ code: 200, msg: 'blog status Active' })
            }
        })
    }
    else if (req.body.status == 0) {
        blogModal.updateOne({ _id: req.body._id }, { $set: { status: 'Inactive' } }, (err, resp) => {
            if (err) {
                res.jsone(err)
            }
            else {
                res.json({ code: 200, msg: 'blog status Inactive' })
            }
        })
    }
}



