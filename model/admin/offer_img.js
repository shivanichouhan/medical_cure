const mongoose = require('mongoose')
const schema = mongoose.Schema

const offerSchema = new schema(
  {
    offer_img:{
        type:Array
    }      
  }
,
  { timestamps: true }
)

module.exports = mongoose.model('offer_pic', offerSchema)
//lklljlkjklj