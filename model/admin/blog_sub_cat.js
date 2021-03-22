const mongoose = require('mongoose')
const schema = mongoose.Schema

const blogsubcategorySchema = new schema(
    {
        blog_sub_cat:{
            type:String,
            require:true,
        },
        blog_child_cat:[{
            type:schema.Types.ObjectId,
            ref:"blog_child_category"
        }],
        blogs:[{
            type:schema.Types.ObjectId,
            ref:"blog"
        }]
  }
,
  { timestamps: true }
)

module.exports = mongoose.model('blog_sub_category', blogsubcategorySchema)
