const mongoose = require('mongoose')
const schema = mongoose.Schema

const daignosSchema = new schema(
    {
       daignosis_name:{
            type:Array
    },
    patId:{
        type:String
    },
    docId:{
        type:String
    }
  },{timestamps:true}
)

module.exports = mongoose.model('pres_daignosis', daignosSchema)
