const mongoose = require('mongoose')
const schema = mongoose.Schema

const diseaseSchema = new schema(
  {
    department_name:{
      type:String
    },
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
