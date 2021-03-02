const mongoose = require('mongoose')
const schema = mongoose.Schema

const doctorRegSchema = new schema(
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
    bearer_token:{
      type:String
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model("doctor_detail", doctorRegSchema)
