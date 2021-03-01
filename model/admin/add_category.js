const mongoose = require('mongoose')
const schema = mongoose.Schema

const categorySchema = new schema(
    {
        category_name:{
            type:String,
            require:true,
        },
        discription:{
            type:String
        },
        sub_category:[{
          type:schema.Types.ObjectId,
          ref:'sub_category'
        }]
  }
,
  { timestamps: true }
)

module.exports = mongoose.model('category', categorySchema)
