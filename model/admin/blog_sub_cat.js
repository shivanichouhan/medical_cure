const mongoose = require('mongoose')
const schema = mongoose.Schema

const blogsubcategorySchema = new schema(
    {
        blog_sub_cat:{
            type:String,
            require:true,
        },
        blogs:[{
            type:schema.Types.ObjectId,
            ref:"blog"
        }]
  }
,
  { timestamps: true }
)

module.exports = mongoose.model('blog_sub_category', blogsubcategorySchema)
