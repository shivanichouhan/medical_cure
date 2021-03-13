const mongoose = require('mongoose')
const schema = mongoose.Schema
const superSpecilistSchema = new schema(
  {
    specilist_name:{
          type:String
      }
  },  
  { timestamps: true }
 
)

module.exports = mongoose.model('super_specilist', superSpecilistSchema)
