const mongoose = require('mongoose')
const schema = mongoose.Schema

const patientSchema = new schema(
  {
    email:{
        type:String
    }, 
    gmailId:{
        type:String
    },
    user_name:{
        type:String
    },
    password:{
        type:String
    },
    patient_id:{
      type:String
    },  
    reg_type:{
        type:String
    },
    health_worker_name:{
        type:String
    },
    patient_name:{
        type:String
    },
    patient_img:{
        type:String,
        default: "https://image.freepik.com/free-vector/doctor-character-background_1270-84.jpg"
    },
    prescription_url:{
        type:String
    },
    mobile:{
        type:String
    },
    otp:{
        type:String
    },
    mob_verify:{
        type:Boolean,
        default:false
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
    Appoinment:[{
        type:schema.Types.ObjectId,
        ref:"appoinment"
    }],
    health_worker_id:{
        type:String
    },
    disease:{
        type:String
    },
    location:{
        type:String
    },
    p_reg:{
        type:Boolean
    },
    patient_status:{
        type:String,
    },
    prescription:[{
        type:schema.Types.ObjectId,
        ref:"prescription"
    }],
    bearer_token:{
        type:String
    },
    status: {
        type: String,
        default:"appoint_requested",
        enum: ['ongoing',"booked",'appoint_requested','accepted',"completed","cancelled"]
    },doctor_id:{type:String}
  },
  { timestamps: true }
)

module.exports = mongoose.model('patient', patientSchema)
