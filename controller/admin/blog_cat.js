const { model, Promise } = require("mongoose")
const blogCat = require("../../model/admin/blog_cat")
const blog = require("../../model/admin/blog")
const path = require("path")
const blog_data = require("../../model/admin/blog")

exports.list_cat_blog = (req, res) => {
    blogCat.find()
   .select('blog_cat_name')
   .exec(async(err,catList)=>{
        if(err){
            res.json({code:400,msg:'blog category list not found'})
        }
        else{
            const array =[]
            await Promise.all(catList.map(async(item)=>{
                const obj = {}
                obj._id = item._id
                obj.blog_cat_name = item.blog_cat_name
                const datablog =await blog.find({blog_cat_name:item.blog_cat_name})
                obj.total_blog = datablog.length
                array.push(obj)
            }))
            res.json({code:200,msg:array})
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


exports.blog_sub_category = async(req, res) => {
    const { data } = req.body;
    console.log(req.body);
    blogCat.findOne({ blog_cat_name: data }).populate("blog_subcategory")
        .then((respo) => {
            console.log(respo)
            res.send(respo.blog_subcategory)

        })
}

exports.detail_blog =async(req,res)=>{
    const arr =[]
    const cate_list = await blogCat.findOne({_id:req.params.catName})
    console.log(cate_list,"jkjji")
    blog_data.find({blog_cat_name:cate_list.blog_cat_name})
    .exec((err,resp)=>{
        if(err){
            res.json({code:400,msg:'blog info not found'})
        }else{
            // const blog_categ = resp.blog_subcategory
            // Promise.all(blog_categ.map((items)=>{
            //     const blog = items.blogs
            //     console.log(blog,"s 88888888888888888888888hinaaaaaaaa")
            //     if(blog.length !=0){
            //         arr.push(...blog);
            //         console.log(items,"shinaaaaaaaa")
            //     }
            // }))
            res.json({code:200,msg:resp})
        }
    })
  
}