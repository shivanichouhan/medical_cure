const mongoose = require('mongoose')
const schema = mongoose.Schema

const labSchema = new schema(
  {
   name:{
       type:String
   },
   instruction:{
       type:String
   },
   price:{
       type:String
   },
   about_test:{
       type:String
   },
   pre_test_info:{
       type:String
   },
   package_items:{
       type:String
   }

  }
,
  { timestamps: true }
)

module.exports = mongoose.model('lab_test', labSchema)
