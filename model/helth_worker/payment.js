const mongoose = require('mongoose')
const schema = mongoose.Schema

const paymentSchema = new schema(
  {
    health_workerId:{
        type:String
    },
    patient_id:{
        type:String
    },
    doctor_id:{
        type:String
    },
    msg:{
        type:String
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Product', eventSchema)
