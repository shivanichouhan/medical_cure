const mongoose = require('mongoose')
const schema = mongoose.Schema

const bannerSchema = new schema(
    {
    banner_img:{
        type:Array
    }      
  }
,
  { timestamps: true }
)

module.exports = mongoose.model('banner_pic', bannerSchema)
