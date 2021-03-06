const mongoose = require('mongoose')
const schema= mongoose.Schema

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
      type: String,
      default: ''
    }, 
    role:{
        type:Number,
        default:1
    }
  })

module.exports = mongoose.model('Admin', adminSchema)