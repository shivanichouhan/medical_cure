const mongoose = require('mongoose')
const schema = mongoose.Schema
const accountantSchema = new schema(
  {

    
  }
,
  { timestamps: true }
)

module.exports = mongoose.model('accountant', accountantSchema)
