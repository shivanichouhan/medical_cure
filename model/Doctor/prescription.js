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
        // instruction:{
        //     type:String
        // },
        medicine:{
            type:Array
        },
        lab_test:{
            type:String
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
