const blogModal = require("../../model/admin/blog")
const blogsubcat = require("../../model/admin/blog_sub_cat")
const cloud = require("../../cloudinary")
const fs = require('fs')

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

exports.create_blog = (req, res) => {
    console.log(req.files, "bhhygigyy88u88888ih")
    var blogObj = new blogModal(req.body)
    blogObj.save(async (err, resp) => {
        if (err) {
            res.json(err)
        }
        else {
            if (req.files.length > 0) {
                var blog = req.files
                const blogUpload = async (path) => await cloud.uploads(path)
                const urlsBlog = []
                for (const file of blog) {
                    const { path } = file
                    const newpathF = await blogUpload(path)
                    urlsBlog.push(newpathF)
                    fs.unlinkSync(path)
                }
                blogModal.findByIdAndUpdate({ _id: resp._id }, { $push: { blog_img: urlsBlog } })
                    .exec((err, blogUpdte) => {
                        if (err) {
                            res.json(err)
                        }
                        else {
                            blogsubcat.updateOne({ blog_sub_cat: req.body.blog_sub_cat }, { $push: { blogs: blogUpdte._id } },
                                (err, blogupdte) => {
                                    if (err) {
                                        res.json(err)
                                    }
                                    else {
                                        res.json({ result: blogUpdte, blog: blogupdte })
                                    }
                                })
                        }
                    })
            } else if (req.files.video_file) {
                const video_path = req.files.video_file
                const real_path = video_path[0]
                const video_data = await videoUpload(real_path.path);
                console.log(video_data, "hgguyguyguy")
            } else if (req.files.video_image) {
                const video_image = req.files.video_image
                const thum_path = video_image[0];
                

            }
            else {
                blogsubcat.updateOne({ blog_sub_cat: req.body.blog_sub_cat }, { $push: { blogs: resp._id } },
                    (err, blogupdte) => {
                        if (err) {
                            res.json(err)
                        }
                        else {
                            res.json({ result: resp, blog: blogupdte })
                        }
                    })
            }
        }
    })
}

exports.edit_blog = (req, res) => {
    blogModal.findByIdAndUpdate(req.params.blogId, req.body)
        .exec((err, updteBlog) => {
            if (err) {
                res.json(err)
            }
            else {
                if (req.files.length > 0) {
                    for (row of req.files.blog_img) {
                        var p = row.path
                    }
                    const path = p
                    cloud.uploads(path).then((resp) => {
                        blogModal.updateOne({ 'blog_img': req.body.imgId }, { $set: { "blog_img.$.url": resp.url, "blog_img.$.imgId": resp.imgId } })
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
                    res.json({ msg: 'blog details update successfully' })
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