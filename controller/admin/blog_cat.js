const { model } = require("mongoose")
const blogCat = require("../../model/admin/blog_cat")
// const a = require("../../views/add")
const path = require("path")
exports.list_cat_blog = (req, res) => {
    blogCat.find()
   .select('blog_cat_name')
   .exec((err,catList)=>{
        if(err){
            res.json({code:400,msg:'blog category list not found'})
        }
        else{
            res.json({code:200,msg:catList})
        }
    })
}

exports.create_cat_blog = (req, res) => {
    console.log(req.body)
    var blogObj = new blogCat(req.body)
    blogObj.save((err, blog_cat) => {
        if (err) {
            res.json(err)
        }
        else {
            res.json(blog_cat)
        }
    })
}

exports.edit_cat_blog = (req, res) => {
    blogCat.updateOne({ _id: req.params.catId }, req.body, (err, resp) => {
        if (err) {
            res.json(err)
        }
        else {
            res.json(resp)
        }
    })
}

exports.remove_cat_blog = (req, res) => {
    blogCat.remove({ _id: req.params.catId }, (err, resp) => {
        if (err) {
            res.json(err)
        }
        else {
            res.json(resp)
        }
    })
}


exports.blog_sub_category = (req, res) => {
    const { data } = req.body;
    console.log(req.body);
    blogCat.findOne({ blog_cat_name: data }).populate("blog_subcategory")
        .then((respo) => {
            console.log(respo)
            res.send(respo.blog_subcategory)

        })
}