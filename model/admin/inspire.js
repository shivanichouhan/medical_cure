const mongoose = require('mongoose')
const schema = mongoose.Schema
const inspireSchema = new schema(
    {
     title:{
         type:String
     },
     sub_title:{
         type:String
     },
     img:{
         type:String
     },
     description:{
         type:String
     }
   },
  { timestamps: true }
)

module.exports = mongoose.model('inspire_story', inspireSchema)
