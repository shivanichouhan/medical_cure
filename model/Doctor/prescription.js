const mongoose = require('mongoose')
const schema = mongoose.Schema

const prescriptionSchema = new schema(
    {
        daignosis:{
            type:String
        },
        alergies:{
            type:String
        },
        // medicine:{
        //     type:String
        // },
        // dosage:{
        //     type:String
        // },
        // duration:{
        //     type:String
        // },
        // med_instruction:{
        //     type:String
        // },
        medicine_details:{
            type:Array
        },
        // lab_name:{
        //     type:String
        // },
        // lab_instruction:{
        //     type:String
        // },
        lab_test_details:{
          type:Array
        },
        dr_advice:{
            type:String
        },
        follow_up:{
            type:String
        }
    }
)

module.exports = mongoose.model('prescription', prescriptionSchema)
