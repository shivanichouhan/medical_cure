const mongoose = require('mongoose')
const schema = mongoose.Schema

const labInstruction = new schema(
    {
       lab_test:{
            type:String
       },
       lab_instruction:{
            type:String
        },
        patId:{
            type:String
        },
        docId:{
            type:String
        }
    },{timestamps:true}
)

module.exports = mongoose.model('pres_lab_instruction', labInstruction)
