const mongoose = require('mongoose')
const schema = mongoose.Schema

const EventSchema = new schema(
  {
    gmailId:{
      type:String
    },
    username:{
      type:String
    },
    email:{
      type:String
    },
    password:{
      type:String
    },
    health_worker_course:{
      type:String
    },
    certificate_img:{
      type:Array
    },
    experience:{
      type:String
    },
    state:{
      type:String
    },
    city:{
      type:String
    },
    pincode:{
      type:String
    },
    address:{
      type:String
    },
    clinic_img:{
      type:Array
    },
    dob:{
      type:String
    },
    gender:{
      type:String
    },
    blood_group:{
      type:String
    },
    adhar_no:{
      type:String
    },
    account_no:{
      type:String
    },
    ifsc_code:{
      type:String
    },
    bearer_token:{
      type:String
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model("user_detail", EventSchema)
