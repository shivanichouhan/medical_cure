const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema
require('mongoose-double')(mongoose)

var SchemaTypes = mongoose.Schema.Types

const EventSchema = new mongoose.Schema(
    {
        first_name:{
            type:String
        },
        last_name:{
            type:String
        },
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
        ug_clg:{
            type:String
        },
        Course: {
            type: String
        },
        u_pass_year: {
            type: String,
        },
        PGCollege_or_University: {
            type: String
        },
        pg_clg:{
            type:String
        },
        Courses: {
            type: String
        },
        p_pass_year: {
            type: String,
        },
        Certificate_University: {
            type: String
        },
        certificate_course:{
            type:String
        },
        c_pass_year:{
            type:String
        },
        super_clg:{
            type:String
        },
        super_course:{
            type:String
        },
        super_pass_year:{
            type:String
        },
        certificate_Img: {
            type: Array
        },
        Employment_status: {
            type: String
        },
        Specialization: {
            type: String
        },
        area_of_interest:{
            type:String
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
            type: String,
        },
        issue_auth:{
            type:String
        },
        License_img_front_side: {
            type: Array
        },
        License_img_back_side: {
            type: Array
        },
        select_identity: {
            type: String
        },
        identity_Number: {
            type: String
        },
        identity_back_side_img: {
            type: Array
        },
        identity_front_side_img: {
            type: Array
        },
        select_bank: {
            type: String
        },
        Account_No: {
            type: String
        },
        IFSC_Code: {
            type: String
        },
        phone_number:{
            type:String
        },
        mobile_number: {
            type: String,
        },
        Account_holder_name: {
            type: String
        },
        status: {
            type: Number,
        },
        otp: {
            type: String
        },
        otp_verify: {
            type: Number
        },
        present_place:{
            type:String
        },
        register:{
            type:String,
            default:"0"
        },
        gmailId: {
            type: String
        },
        first_name: {
            type: String
        },
        last_name: {
            type: String
        },
        username: {
            type: String
        },
        email: {
            type: String
        },
        password: {
            type: String
        },
        bearer_token: {
            type: String
        },
        firebase_token:{
            type:String
        },
        profile_pic:{
            type: String,
            default: "https://image.freepik.com/free-vector/doctor-character-background_1270-84.jpg"
        }, user_id:
            { type: String },
        dumy_userName: { type: String },

        certificate: {
            type: Array
        },
        mobile_number: {
            type: String
        },
        user_id: {
            type: String
        },
        otp: {
            type: String
        },
        otp_verify: {
            type: Number
        },fees:{
            type:Number,
            default:200

        },rating:{
            type:Number,
            default:4
        }
    })

module.exports = mongoose.model('Doctor_Registration', EventSchema)
