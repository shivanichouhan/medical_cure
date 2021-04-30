const mongoose = require('mongoose')
const schema = mongoose.Schema
const EventSchema = new schema(
  {
    gmailId: {
      type: String,
      default:""

    },
    username: {
      type: String,
      default:""

    },
    email: {
      type: String,
      default:""
    },
    password: {
      type: String,
      default:""

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
      type:String,
      default:""

    },
    certificate_img:{
      type: Array
    },
    experience:{
      type: String,
      default:""

    },
    state: {
      type: String,
      default:""

    },
    city: {
      type: String,
      default:""

    },
    pincode: {
      type: String,
      default:""

    },
    address: {
      type: String,
      default:""

    },
    clinic_img: {
      type: Array
    },
    dob: {
      type: String,
      default:""

    },
    gender: {
      type: String,
      default:""

    },
    blood_group: {
      type: String,
      default:""

    },
    card_name: {
      type: String,
      default:""

    },
    account_no: {
      type: String,
      default:""

    },
    ifsc_code: {
      type: String,
      default:""

    },
    phone:{
      type:String,
      default:""

    },
    bearer_token: {
      type: String,
      default:""

    },
    photo:{
      type: String,
      default:""

    },
   imgId: {
      type: String,
      default:""

    },
    mobile: {
      type: String,
      default:""

    },
    mobile_verfiy:{
      type:Number,
    }
  })


module.exports = mongoose.model("user_detail", EventSchema)
