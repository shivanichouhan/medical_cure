const mongoose = require('mongoose')
const schema = mongoose.Schema

const state_district = new schema(
    {
        State:{
            type:String
        },
        District:{
            type:String
        }
    }
    ,
    { timestamps: true }
)

module.exports = mongoose.model('district', state_district)
