const mongoose = require('mongoose')
const schema = mongoose.Schema
const collageSchema = new schema(
  {
    clg_name:{
          type:String
      }
  },  
  { timestamps: true }
 
)

module.exports = mongoose.model('collage_list', collageSchema)
