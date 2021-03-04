const mongoose = require('mongoose')
const schema = mongoose.Schema

const eventSchema = new schema(
  {
    user_id: {
      type: String
    },email:{
      type:String,
      default:" "
    },
    password:{
      type:String
    },
     username: {
      type: String,
      default:''
    },user_Dob:{
      type:Date,
      default:''
    },
    resetPasswordToken: {
      type: String
    },
    verified: {
      type: Number,
      default:0
    },
    first_name: {
      type: String,
      default:""
    },
    last_name: {
      type: String,
      default:" "
    },
    gender: {
      type: String,
      default:""
    },
    Dob: {
      type: String,
      default:""
    },
    bio: {
      type: String,
      default:''
    },
    profile_pic: {
      type: String,
      default: 'https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659651_960_720.png'
    },
  
  },
  { timestamps: true }
)

module.exports = mongoose.model('User', eventSchema)
