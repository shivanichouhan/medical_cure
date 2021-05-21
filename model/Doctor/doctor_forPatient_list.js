const mongoose = require('mongoose')
const schema = mongoose.Schema
const { ObjectId } = mongoose.Schema


const docDegSchema = new schema(
    {
        doctor_id: {
            type: String
        }, doctor_id:
        {
            type: String
        }, Doctor_status: {
            type: String
        }
    },
    { timestamps: true }

)

module.exports = mongoose.model('DoctorForPatient', docDegSchema)
