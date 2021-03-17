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
        mobile_number: {
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
        }
    })

module.exports = mongoose.model("patient_detail", PatientSchema)