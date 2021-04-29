const mongoose = require('mongoose')
const schema = mongoose.Schema
const collageSchema = new schema(
  {
    dgree_name:{
          type:String
      }
  },  
  { timestamps: true }
 
)

module.exports = mongoose.model('dgree_list', collageSchema)
