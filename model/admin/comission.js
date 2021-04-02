const mongoose = require('mongoose')
const schema = mongoose.Schema
const commisionSchema = new schema(
   {
       comission_for:{
           type:String
       },
       category:{
           type:String
       },
       subcategory:{
           type:String
       },
       specilist:{
           type:String
       },
       comission_rate:{
           type:String
       },
       type:{
           type:String
       }
   },
  { timestamps: true }
)

module.exports = mongoose.model('comission', commisionSchema)
