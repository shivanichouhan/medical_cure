const mongoose = require('mongoose')
const schema = mongoose.Schema
const feesSchema = new schema(
    {
     fees:{
         type:Number
     },
     name:{
         type:Number
     }
   },
  { timestamps: true }
)

module.exports = mongoose.model('fees_master', feesSchema)
