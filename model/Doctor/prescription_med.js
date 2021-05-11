const mongoose = require('mongoose')
const schema = mongoose.Schema

const prescriptionMedSchema = new schema(
    {

        medicine:{
            type:String
        },
        dosage:{
            type:String
        },
        duration:{
            type:String
        },
        med_instruction:{
            type:String
        },
        patId:{
            type:String
        },
        docId:{
            type:String
        }

    }
)

module.exports = mongoose.model('pres_medicine', prescriptionMedSchema)
