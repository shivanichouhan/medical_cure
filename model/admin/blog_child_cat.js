const mongoose = require('mongoose')
const schema = mongoose.Schema

const blogschildcategorySchema = new schema(
    {
        blog_child_cat:{
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

module.exports = mongoose.model('blog_child_category',blogschildcategorySchema )
