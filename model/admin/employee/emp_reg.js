const mongoose = require('mongoose')
const schema = mongoose.Schema

const employeeSchema = new schema(
  {
     emp_name:{
         type:String
     },
     phone:{
         type:String
     },
     email:{
         type:String
     },
     password:{
         type:String
     },
     address:{
         type:String
     },
     discription:{
         type:String
     },
     identity_no:{
         type:String
     },
     front_identity:{
         type:Array
     },
     back_identity:{
        type:Array
     },
     salary:{
         type:String
     },
     experience:{
         type:String
     },
     emp_type:{
         type:String
     },
     city:{
         type:String
     },
     department:{
         type:String
     },
     relative_con:{
         type:String
     },
     location:{
         type:String
     },
     staff_right:{
        type:String
     },
     status:{
        type:Number,
        default:1
     },
     role:{
         type:String
     }
  }
,
  { timestamps: true }
)

module.exports = mongoose.model('employee', employeeSchema)
