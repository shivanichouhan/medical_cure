const mongoose = require('mongoose')
const schema = mongoose.Schema
const XpostSchema = new schema(
    {
        title:{
            type:String
        },
        discription:{
            type:String
        },
        poster:{
            type:String
        }
    },
 
  { timestamps: true }
 
)

module.exports = mongoose.model('Xpost', XpostSchema)
