const mongoose = require('mongoose')
const schema = mongoose.Schema

const PatientSchema = new schema(
    {
        user_name: {
            type: String
        },
        gmailId: {
            type: String
        },
        email: {
            type: String
        },
        mobile: {
            type: String
        },
        otp: {
            type: String
        },
        password: {
            type: String
        },
        bearer_token: {
            type: String
        },
        profile_pic:{
            type:String,
            default:"https://image.freepik.com/free-vector/doctor-character-background_1270-84.jpg"
        }
    })

module.exports = mongoose.model("patient_detail", PatientSchema)