const blogCat = require("")

exports.list_cat_blog =(req,res)=>{
    blogCat.find()
    .populate({
        path:'blog_subcategory',
        model:'blog_sub_category'
    , populate:{
        path:'blogs',
        model:'blog'
    }
    })
    .exec((err,catList)=>{
        if(err){
            res.json(err)
        }
        else{
            res.json(catList)
        }
    })
}