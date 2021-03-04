const mongoose = require('mongoose')
const schema = mongoose.Schema

const diseaseSchema = new schema(
  {
    disease_name:{
        type:String
    }, 
    icon:{
        type:String
    }   
  }
,
  { timestamps: true }
)

module.exports = mongoose.model('disease', diseaseSchema)
