const mongoose = require('mongoose')
const schema = mongoose.Schema

const doctorSchema = new schema(
    {
        Gender: {
            type: String
        },
        DOB: {
            type: String
        },
        Blood_group: {
            type: String
        },
        UGCollege_University: {
            type: String
        },
        Course: {
            type: String
        },
        passing_year: {
            type: Date,
        },
        PGCollege_or_University: {
            type: String
        },
        Courses: {
            type: String
        },
        pass_year: {
            type: Date,
        },
        Certificate_University: {
            type: String
        },
        certificate_Img: {
            type: Array
        },
        passing_year_certificate: {
            type: Array
        },
        Employment_status: {
            type: String
        },
        Specialization: {
            type: String
        },
        Experience: {
            type: String
        },
        State: {
            type: String
        },
        City: {
            type: String
        },
        Address: {
            type: String
        },
        pincode: {
            type: String
        },
        Lincense_no: {
            type: String
        },
        issued_date: {
            type: Date,      
        },
        License_img_front_side: {
            type: Array
        },
        License_img_back_side: {
            type: Array
        },
        // identity: {
        //     type: String
        // },
        identity_front_side_img: {
            type: Array
        },
        identity_back_side_img: {
            type: Array
        },
        select_bank: {
            type: String
        },
        Account_No: {
            type: Number
        },
        IFSC_Code: {
            type: String
        },
        Phone_Number: {
            type: String
        },
        Account_holder_name: {
            type: String
        },
        otp: {
            type: Number
        },
        status:{
            type:Boolean,
            default:false
        }
    })

module.exports = mongoose.model('Doctor_Registration', doctorSchema)