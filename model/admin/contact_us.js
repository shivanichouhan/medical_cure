const mongoose = require('mongoose')
const schema = mongoose.Schema

const contact_usSchema = new schema(
    {
        name: {
            type: String
        },
        email: {
            type: String
        },
        phone: {
            type: String
        },
        subject: {
            type: String
        },
        message: {
            type: String
        }
    }
    ,
    { timestamps: true }
)

module.exports = mongoose.model('contact_us', contact_usSchema)
