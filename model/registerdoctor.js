const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema
require('mongoose-double')(mongoose)

var SchemaTypes = mongoose.Schema.Types

const EventSchema = new mongoose.Schema(
    {
        Name: {
            type: String
        },
        EmailId: {
            type: String
        },
        Address: {
            type: String
        },
        Education: {
            type: String
        },
        MobileNumber: {
            type: String
        }

    })

module.exports = mongoose.model('Doctor', EventSchema)
