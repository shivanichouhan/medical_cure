const mongoose = require('mongoose')
const schema = mongoose.Schema

const labSchema = new schema(
  {
   lab_name:{
       type:String
   },
   test_name:{
       type:String
   },
   blood_group:{
       type:String
   },
   test_for:{
       type:String
   },
   cost:{
       type:Number
   },
   test_status:{
    type:String,
    default:'Deactive'
}
  }
,
  { timestamps: true }
)

module.exports = mongoose.model('lab_test', labSchema)
