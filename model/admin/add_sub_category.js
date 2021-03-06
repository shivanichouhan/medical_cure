const mongoose = require('mongoose')
const schema = mongoose.Schema

const subcategorySchema = new schema(
    {
        sub_category:{
            type:String
        },
  }
,
  { timestamps: true }
)

module.exports = mongoose.model('sub_category', subcategorySchema)
