const mongoose = require('mongoose')
const schema = mongoose.Schema

const courseSchema = new schema(
  {
    degree_name:{
        type:String
    }

  }
,
  { timestamps: true }
)

module.exports = mongoose.model('course', courseSchema)
