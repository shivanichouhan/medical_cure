const mongoose = require('mongoose')
const schema = mongoose.Schema

const reviewSchema = new schema(
    {
        doctor_id: {
            type: String
        },
        accepted_time: {
            type: Date
        }, ongoing_time: {
            type: Date
        },
        patient_id: {
            type: String
        }, responce_time: {
            type: String
        }
    }
    ,
    { timestamps: true }
)

module.exports = mongoose.model('Responce_time', reviewSchema)
