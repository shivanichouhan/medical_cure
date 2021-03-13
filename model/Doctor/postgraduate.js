const mongoose = require('mongoose')
const schema = mongoose.Schema
const postGraduateSchema = new schema(
  {
    pg_name:{
          type:String
      }
  },  
  { timestamps: true }
 
)

module.exports = mongoose.model('post_graduation', postGraduateSchema)
