const mongoose = require('mongoose')
const schema = mongoose.Schema
const empSalSchema = new schema(
    {
     name:{
         type:String
     },
     basic_salary:{
         type:Number
     },
     house_rent:{
         type:Number
     },
     transport_allowance:{
         type:Number
     },
     medical_allowance:{
         type:Number
     },
     over_time_hr:{
         type:Number
     },
     rate:{
         type:Number
     },
     provident_fund:{
         type:Number
     },
     hr_rate:{
         type:Number
     },
     total_allowance:{
         type:Number
     },
     total_deduction:{
         type:Number
     },
     gross_salary:{
         type:Number
     },
     net_salary:{
         type:Number
     }
   },
  { timestamps: true }
)

module.exports = mongoose.model('salary_master', empSalSchema)
