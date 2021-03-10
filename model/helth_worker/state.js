const mongoose = require('mongoose')
const schema = mongoose.Schema

const state_district = new schema(
    {
        State: {
            type: String
        }
    }
    ,
    { timestamps: true }
)

module.exports = mongoose.model('State', state_district)
