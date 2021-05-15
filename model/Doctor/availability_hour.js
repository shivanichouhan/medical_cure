const mongoose = require('mongoose')
const schema = mongoose.Schema
require('mongoose-double')(mongoose);
var SchemaTypes = mongoose.Schema.Types;

const reviewSchema = new schema(
    {
        doctor_id: {
            type: String
        },
        availability_hour: {
            type: SchemaTypes.Double
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
