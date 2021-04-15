const mongoose = require('mongoose')
const schema = mongoose.Schema

const mitrasuscribeSchema = new schema(
    {
        suscribe_email:{
            type:String
        }
    }
     ,
     {timestamps:true} 
    )

module.exports = mongoose.model("suscribe_mitra", mitrasuscribeSchema)