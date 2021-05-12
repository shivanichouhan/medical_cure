const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema
require('mongoose-double')(mongoose)
var SchemaTypes = mongoose.Schema.Types
const EventSchema = new mongoose.Schema(
    {
        first_name:{
            type:String,
            default:" "
        },
        last_name:{
            type:String,
            default:" "
        },
        Gender: {
            type: String,
            default:" "
        },
        DOB: {
            type: String,
            default:" "
        },
        Blood_group: {
            type: String,
            default:" "
        },
        UGCollege_University: {
            type: String,
            default:" "
        },
        ug_clg:{
            type:String,
            default:" "
        },
        Course: {
            type: String,
            default:" "
        },
        u_pass_year: {
            type: String,
            default:" "
        },
        PGCollege_or_University: {
            type: String,
            default:" "
        },
        pg_clg:{
            type:String,
            default:" "
        },
        Courses: {
            type: String,
            default:" "
        },
        p_pass_year: {
            type: String,
            default:" "
        },
        Certificate_University: {
            type: String,
            default:" "
        },
        certificate_course:{
            type:String,
            default:" "
        },
        c_pass_year:{
            type:String,
            default:" "
        },
        super_clg:{
            type:String,
            default:" "
        },
        super_course:{
            type:String,
            default:" "
        },
        super_pass_year:{
            type:String,
            default:" "
        },
        certificate_Img: {
            type: Array,

        },
        Employment_status: {
            type: String,
            default:" "
        },
        Specialization: {
            type: String,
            default:" "
        },
        area_of_interest:{
            type:Array,
            default:" "
        },
        Experience: {
            type: String,
            default:" "
        },
        State: {
            type: String,
            default:" "
        },
        City: {
            type: String,
            default:" "
        },
        Address: {
            type: String,
            default:" "
        },
        pincode: {
            type: String,
            default:" "
        },
        Lincense_no: {
            type: String,
            default:" "
        },
        issued_date: {
            type: String,
            default:" "
        },
        issue_auth:{
            type:String,
            default:" "
        },
        License_img_front_side: {
            type: Array
        },
        License_img_back_side: {
            type: Array
        },
        select_identity: {
            type: String,
            default:" "
        },
        identity_Number: {
            type: String,
            default:" "
        },
        identity_back_side_img: {
            type: Array
        },
        identity_front_side_img: {
            type: Array
        },
        select_bank: {
            type: String,
            default:" "
        },
        Account_No: {
            type: String,
            default:" "
        },
        IFSC_Code: {
            type: String,
            default:" "
        },
        phone_number:{
            type:String,
            default:" "
        },
        mobile_number: {
            type: String,
            default:" "
        },
        Account_holder_name: {
            type: String,
            default:" "
        },
        status: {
            type: String,
            default:" "
        },
        otp: {
            type: String,
            default:" "
        },
        otp_verify: {
            type: Number.toString,
            default:" "

        },
        present_place:{
            type:String,
            default:" "
        },
        register:{
            type:String,
            default:"0"
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
        },
        notification_count:{
            type:Number,
            default:0
        },category:{
            type:String
        }
    })

module.exports = mongoose.model('Doctor_Registration', EventSchema)
