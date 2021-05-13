const mongoose = require('mongoose')
const schema = mongoose.Schema
const inspireSchema = new schema(
    {
        text: {
            type: String
        }, text2: { type: String }

    },
    { timestamps: true }
)

module.exports = mongoose.model('Question', inspireSchema)
