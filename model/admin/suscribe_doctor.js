const mongoose = require('mongoose')
const schema = mongoose.Schema

const doctorsuscribeSchema = new schema(
    {
        suscribe_email:{
            type:String
        }
    }
     ,
     {timestamps:true} 
    )

module.exports = mongoose.model("suscribe_doctor", doctorsuscribeSchema)