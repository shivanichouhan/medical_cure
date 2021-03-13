const mongoose = require('mongoose')
const schema = mongoose.Schema
const licenceAuthSchema = new schema(
  {
  medical_license_issue_authority:{
          type:String
        }
  },  
  { timestamps: true }
 
)

module.exports = mongoose.model('medical_lic_auth', licenceAuthSchema)
