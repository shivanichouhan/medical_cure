const mongoose = require('mongoose')
const schema = mongoose.Schema

const prescriptionSchema = new schema(
    {
        name: {
            type: String
        },
        age: {
            type: String
        }
    }
    ,
    { timestamps: true }
)

module.exports = mongoose.model('prescription', prescriptionSchema)
