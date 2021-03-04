const mongoose = require('mongoose')
const schema = mongoose.Schema
const appoinmentSchema = new schema(
    {
        appoinment_id:{
            type:String
        },
        patient_name:{
            type:String
        },
        doctor_name:{
            type:String
        },
        department:{
            type:String
        },
        app_date:{
            type:String
        },
        app_time:{
            type:String
        },
        message:{
            type:String
        },
        status:{
            type:String,
        },
        patient_number:{
            type:String
        },
        patient_email:{
            type:String
        }
  }
,
  { timestamps: true }
)

module.exports = mongoose.model('appoinment', appoinmentSchema)
