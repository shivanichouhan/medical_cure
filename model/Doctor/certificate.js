const mongoose = require('mongoose')
const schema = mongoose.Schema
const docDegSchema = new schema(
  {
     certificate_name:{
          type:String
      }
  },  
  { timestamps: true }
 
)

module.exports = mongoose.model('certificate', docDegSchema)
