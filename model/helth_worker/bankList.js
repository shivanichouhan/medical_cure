const mongoose = require('mongoose')
const schema = mongoose.Schema

const bankListSchema = new schema(
    {
        bank_name:{
            type:String
        }
    }
    ,
    { timestamps: true }
)

module.exports = mongoose.model('bank',bankListSchema)
