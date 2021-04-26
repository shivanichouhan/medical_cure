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
        },helth_worker_id:{
            type:String
        }
    })

module.exports = mongoose.model('helthFeedback', EventSchema)
