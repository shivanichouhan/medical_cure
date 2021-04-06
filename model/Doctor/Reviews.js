const mongoose = require('mongoose')
const schema = mongoose.Schema

const reviewSchema = new schema(
    {
        doctor_id: {
            type: String
        },
        ratting : {
            type: String
        },
        patient_id: {
            type: String
        }
    }
    ,
    { timestamps: true }
)

module.exports = mongoose.model('review', reviewSchema)
