const mongoose = require('mongoose')
const schema = mongoose.Schema

const paymentSchema = new schema(
  {
    health_workerId:{
        type:String
    },
    doctor_id:{
        type:String
    },
    status:{
        type:String
    },
    amount:{
      type:Number,
      default:0
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Credit', paymentSchema)
