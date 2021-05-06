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
        },
        doc_name:{
            type:String
        },
        doc_profile:{
            type:String
        },
        doc_id:{
            type:String
        }
    },
 
  { timestamps: true }
 
)

module.exports = mongoose.model('mypost', XpostSchema)
