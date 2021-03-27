const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema
require('mongoose-double')(mongoose)

var SchemaTypes = mongoose.Schema.Types

const EventSchema = new mongoose.Schema(
    {
        image: {
            type: String,
            default: " "
        },
        name: { type: String },
        Description: {
            type: String,
            default: " "
        },
        Contact_No: {
            type: Number,
            default: " "
        },
        Emailid: {
            type: String,
            default: " "
        },
        subject: {
            type: String,
            default: " "
        }

    })

module.exports = mongoose.model('Contact_us', EventSchema)
