const mongoose = require('mongoose')
const schema = mongoose.Schema

const blogcategorySchema = new schema(
    {
        blog_cat_name:{
            type:String,
            require:true,
        },
        blog_subcategory:[{
          type:schema.Types.ObjectId,
          ref:'blog_sub_category'
        }]
  }
,
  { timestamps: true }
)

module.exports = mongoose.model('blog_category', blogcategorySchema)
