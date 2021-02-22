const mongoose = require('mongoose')
const schema = mongoose.Schema

const specialistSchema = new schema(
    {
    specialist_name:{
        type:String
    },
    specialist_img:{
        type:String
    }      
  }
,
  { timestamps: true }
)

module.exports = mongoose.model('specialist', specialistSchema)
