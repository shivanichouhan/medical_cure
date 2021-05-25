const mongoose = require('mongoose')
const schema = mongoose.Schema

const courseSchema = new schema(
    {
        question: {
            type: String
        }, answer: {
            type: String
        }
    }
    ,
    { timestamps: true }
)

module.exports = mongoose.model('Faq', courseSchema)
