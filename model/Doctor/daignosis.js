const mongoose = require('mongoose')
const schema = mongoose.Schema
const daignosisSchema = new schema(
  {
    Daignosis:{
          type:String
      }
  },  
  { timestamps: true }
 
)

module.exports = mongoose.model('daignosis', daignosisSchema)
