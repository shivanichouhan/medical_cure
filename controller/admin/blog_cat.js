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

exports.detail_blog =(req,res)=>{
    const arr =[]
    blogCat.findOne({_id:req.params.catId},{blog_cat_name:1})
    .populate([{
        path:'blog_subcategory',
        select:'blog_sub_cat blogs',
        populate: {
            path: 'blogs',
            model: 'blog',
            select:'blog_img name discription'
        }
    }]).exec((err,resp)=>{
        if(err){
            res.json({code:400,msg:'blog info not found'})
        }else{
            const blog_categ = resp.blog_subcategory
            Promise.all(blog_categ.map((items)=>{
                const blog = items.blogs
                console.log(blog,"s 88888888888888888888888hinaaaaaaaa")
                if(blog.length !=0){
                    arr.push(...blog);
                    console.log(items,"shinaaaaaaaa")
                }
            }))
            res.json({code:200,msg:arr})
        }
    })
  
}