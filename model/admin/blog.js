const mongoose = require('mongoose')
const schema = mongoose.Schema

const blogSchema = new schema(
    {
       name:{
           type:String
       },
       blog_img:{
           type:Array
       },
       blog_cat_name:{
           type:String
       },
       blog_sub_cat:{
           type:String
       },
       discription:{
           type:String
       },
       status:{
           type:String,
           default:1
       }
  }
,
  { timestamps: true }
)

module.exports = mongoose.model('blog', blogSchema)
