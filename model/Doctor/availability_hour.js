const mongoose = require('mongoose')
const schema = mongoose.Schema

const reviewSchema = new schema(
    {
        doctor_id: {
            type: String
        },
        availability_hour: {
            type: Number
        }, OnlineTime: {
            type: Date
        },
        year: {
            type: Number
        }, month: {
            type: Number
        }, day: {
            type: Number
        }, switch: { type: String }
    }
    ,
    { timestamps: true }
)

module.exports = mongoose.model('Availble_Hour', reviewSchema)
