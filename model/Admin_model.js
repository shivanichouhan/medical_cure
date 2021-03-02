const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema
require('mongoose-double')(mongoose)

var SchemaTypes = mongoose.Schema.Types

const EventSchema = new mongoose.Schema(
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
    con_password: {
      type: Date,
      default: ''
    }
  })

module.exports = mongoose.model('Admin', EventSchema)
