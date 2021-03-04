const mongoose = require('mongoose')
const schema = mongoose.Schema
const departmentSchema = new schema(
    {
      department_name:{
          type:String
      },
      description:{
          type:String
      },
      department_status:{
          type:String
      }
   },
  { timestamps: true }
)

module.exports = mongoose.model('department', departmentSchema)
