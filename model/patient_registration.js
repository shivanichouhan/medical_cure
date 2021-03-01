const mongoose = require('mongoose')
const schema = mongoose.Schema

const patientSchema = new schema(
  {
    patient_name:{
        type:String
    },
    patient_img:{
        type:String
    },
    mobile:{
        type:String
    },
    age:{
        type:String
    },
    gender:{
        type:String
    },
    height:{
        type:String
    },
    weight:{
        type:String
    },
    userId:{
        type:String
    }

  },
  { timestamps: true }
)

module.exports = mongoose.model('patient', patientSchema)
