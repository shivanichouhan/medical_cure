const mongoose = require('mongoose')
const schema = mongoose.Schema

const adminSchema = new schema(
  {
    user_name: {
      type: String
    },
    email: {
      type: String,
      default: " "
    },
    password: {
      type: String
    },
    phone: {
      type: String
    },
    otp: {
      type: String
    },

 first_name:{
      type:String
  },
 last_name:{
     type:String
 },
 phone:{
      type:String
  },
  address:{
      type:String
  },
  emp_id:{
      type:String
  },
  joining_date:{
      type:String
  },
  discription:{
      type:String
  },
  identity_type:{
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
  profile_pic:{
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
     type:String,
  },
  role:{
      type:String
  }
  })

module.exports = mongoose.model('Admin', adminSchema)