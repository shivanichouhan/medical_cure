const mongoose = require('mongoose')
const schema = mongoose.Schema

const categorySchema = new schema(
    {
        category_name:{
            type:String
        },
        category_img:{
            type:String
        }
  }
,
  { timestamps: true }
)

module.exports = mongoose.model('category', categorySchema)
