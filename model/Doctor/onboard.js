const mongoose = require('mongoose')
const schema = mongoose.Schema

const eventSchema = new schema(
    {
        title: {
            type: String
        }, summery: {
            type: String
        },
        image: {
            type: String
        }

    },
    { timestamps: true }
)

module.exports = mongoose.model('Onboard_image', eventSchema)
