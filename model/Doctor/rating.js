const mongoose = require('mongoose')
const schema = mongoose.Schema

const ratingSchema = new schema(
    {
        doctor_id: {
            type: String
        },
        rating : {
            type: Number
        },
        patient_id: {
            type: String
        },
        patient_name:{
            type:String
        },
        patient_img:{
            type:String
        },
        date:{
            type:Date
        }
    }
    ,
    { timestamps: true }
)

module.exports = mongoose.model('rating', ratingSchema)