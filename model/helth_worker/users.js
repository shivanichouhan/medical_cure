const mongoose = require('mongoose')
const schema = mongoose.Schema
const EventSchema = new schema(
  {
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
    mobile:{
      type:String,
      unique:true
    },
    otp:{
      type:String,
      default:""
    },
    register:{
      type:String,
      default:"0"
    },
    status:{
      type:String,
      default:"Inactive"
    },
    health_worker_course:{
      type:String
    },
    certificate_img:{
      type: Array
    },
    experience:{
      type: String
    },
    state: {
      type: String
    },
    city: {
      type: String
    },
    pincode: {
      type: String
    },
    address: {
      type: String
    },
    clinic_img: {
      type: Array
    },
    dob: {
      type: String
    },
    gender: {
      type: String
    },
    blood_group: {
      type: String
    },
    adhar_no: {
      type: String
    },
    account_no: {
      type: String
    },
    ifsc_code: {
      type: String
    },
    phone:{
      type:String
    },
    bearer_token: {
      type: String
    },
    photo:{
      type: String
    },
   imgId: {
      type: String
    },
    mobile: {
      type: String
    },
    mobile_verfiy:{
      type:Number,
    }
  })


module.exports = mongoose.model("user_detail", EventSchema)
