const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema
require('mongoose-double')(mongoose)

var SchemaTypes = mongoose.Schema.Types

const EventSchema = new mongoose.Schema(
    {
        Rate_Us: { 
            type: Number,
            default: 10
          },
        Rate_Status: {
            type: String,
            default:" "
        },
        Comment: {
            type: String,
            default:" "
        },
        User_Image: {
            type: String,
            default:" "
        }
    })

module.exports = mongoose.model('Feedback', EventSchema)
