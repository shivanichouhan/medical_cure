const mongoose = require('mongoose')
const schema = mongoose.Schema

const cureBlogSchema = new schema(
  {
       title:{
           type:String
       },
       sub_title:{
           type:String
       },
       blog_img:{
           type:Array
       },
       discription:{
           type:String
       }
  }
,
  { timestamps: true }
)

module.exports = mongoose.model('cure_blog', cureBlogSchema)
