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
       cat:{
           type:String
       },
       sub_cat:{
           type:String
       },
       discription:{
           type:String
       }
  }
,
  { timestamps: true }
)

module.exports = mongoose.model('blog', blogSchema)
