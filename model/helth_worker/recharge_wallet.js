const mongoose = require('mongoose')
const schema = mongoose.Schema
const double = require('mongoose-double')(mongoose)

const commisionSchema = new schema(
    {
        helthworker_id: {
            type: String
        },
        amount: {
            type: Number,
            default: 0
        },
        status: {
            type: String
        }, 
        email: {
            type: String,
            default: ""
        },
        username: { type: String },
        photo: { type: String },
        mobile: { type: String }
    },
    { timestamps: true }
)

module.exports = mongoose.model('Wallet_recharge', commisionSchema)
