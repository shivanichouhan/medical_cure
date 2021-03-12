const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema
require('mongoose-double')(mongoose)
var SchemaTypes = mongoose.Schema.Types

const EventSchema = new mongoose.Schema(
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
            type: String
        },
        passing_year_certificate: {
            type: String
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
            type: String
        },
        License_img_back_side: {
            type: String
        },
        select_identity: {
            type: String
        },
        PAN_Number: {
            type: String
        },
        PanCard_front_side_img: {
            type: String
        },
        PanCard_back_side_img: {
            type: String
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
            type: String,
            default:""
        },
        Account_holder_name: {
            type: String
        },
        status:{
            type:Number,
        },
        otp: {
            type: String
        },
        gmailId: {
            type: String
        },
        username: {
            type: String
        },
        email: {
            type: String
        },
        password:{
            type: String
        },
        bearer_token:{
            type: String
        },
         profile_pic:{
            type: String,
            default: "https://image.freepik.com/free-vector/doctor-character-background_1270-84.jpg"
        },
         user_id:{           
             type: String 
        },
        dumy_userName:{
            type: String
        }
        
    },{timestamps:true})

module.exports = mongoose.model('Doctor_Registration', EventSchema)
