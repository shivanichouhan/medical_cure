const mongoose = require('mongoose')
const schema = mongoose.Schema

const patientSchema = new schema(
    {
        patient_id: {
            type: String
        },
        health_worker_name: {
            type: String
        },
        patient_name: {
            type: String
        },
        patient_img: {
            type: String
        },
        mobile: {
            type: String
        },
        otp: {
            type: String
        },
        mob_verify: {
            type: Boolean,
            default: false
        },
        age: {
            type: String
        },
        gender: {
            type: String
        },
        height: {
            type: String
        },
        weight: {
            type: String
        },
        Appoinment: [{
            type: schema.Types.ObjectId,
            ref: "appoinment"
        }],
        health_worker_id: {
            type: String
        },
        disease: {
            type: String
        },
        location: {
            type: String
        },
        p_reg: {
            type: Boolean
        },
        patient_status: {
            type: String,
        }, disease_id: { type: String },
        status: {
            type: String,
            enum: ['ongoing', "booked", 'accepted', "completed", "cancelled"]
        }, availability_check: {
            type: String
        }, doctor_id: { type: String }
    },
    { timestamps: true }
)

module.exports = mongoose.model('patient', patientSchema)
