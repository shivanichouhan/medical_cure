const mongoose = require('mongoose')
const schema = mongoose.Schema

const alergiSchema = new schema(
    {
       alergies_name:{
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

module.exports = mongoose.model('pres_alergies', alergiSchema)
