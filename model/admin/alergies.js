const mongoose = require('mongoose')
const schema = mongoose.Schema

const alergiesSchema = new schema({
    alergies:{
        type:String
    }
})

module.exports = mongoose.model("alergies", alergiesSchema)
