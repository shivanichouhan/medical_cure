const mongoose = require('mongoose')
const schema = mongoose.Schema
const docDegSchema = new schema(
    {
        doctor_id: {
            type: String
        }, patient_id: {
            type: String
        }, room: {
            type: String
        },status:{type:String}
    },
    { timestamps: true }

)

module.exports = mongoose.model('doctor_patient_talk', docDegSchema)
