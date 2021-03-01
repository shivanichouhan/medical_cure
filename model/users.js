const mongoose = require('mongoose')
const schema = mongoose.Schema

const EventSchema = new schema(
  {
    gmailId:{
      type:String
    },
    username:{
      type:String
    },
    email:{
      type:String
    },
    password:{
      type:String
    },
    health_worker_course:{
      type:String
    },
    certificate_img:{
      type:Array
    },
    experience:{
      type:String
    },
    state:{
      type:String
    },
    city:{
      type:String
    },
    pincode:{
      type:String
    },
    address:{
      type:String
    },
    clinic_img:{
      type:Array
    },
    dob:{
      type:String
    },
    gender:{
      type:String
    },
    blood_group:{
      type:String
    },
    adhar_no:{
      type:String
    },
    account_no:{
      type:String
    },
    ifsc_code:{
      type:String
    },
<<<<<<< HEAD
    gender: {
      type: String,
      default:""
    },
    Dob: {
      type: String,
      default:""
    },
    bio: {
      type: String,
      default:''
    },
    profile_pic: {
      type: String,
      default: 'https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659651_960_720.png'
    },
    country: {
      type: String,
      default:''
    },
    flag: {
      type: String,
      default:"https://cdn.britannica.com/97/1597-004-05816F4E/Flag-India.jpg"
    },
    block: {
      type: Number,
      default: 0
    },
    version: {
      type: String
    },
    device_id: {
      type: String
    },
    device:{
        type:String
    },
    signup_type: {
      type: String
    },
    tokon: {
      type: String
    },
    bearer_token: {
      type: String
    },
    
    otp: {
      type: String,
      default: ''
    },
    city: {
      type: String,
      default:''
    },
    language: {
      type: String,
      default:''
    },
    account_type: {
      type: String,
      default:'Public'
    },
    deactivation: {
      type: Boolean,
      default: false
    },
    action:{type:String},
    follwers: {
      type: Number,
      default: 0
    },
    followings:
      {
        type: Number,
        default: 0
      }
    ,
    user_videos: [
      {
        type: ObjectId,
        ref: 'Video'
      }
    ],device_token:{
      type:String
    },
    official_account: {
      type: String,
      default: 'false'
    },
    likes: {
      type: Number,
      default: 0
    },
    no_of_share: {
      type: Number,
      default: 0
    },
    user_audio_path: [
      {
        type: ObjectId,
        ref: 'admin_Sounds'
      }
    ],
    allow_download_my_video: {
      type: String,
      default:'0'
    },
    allow_sharing: {
      type: String,
      default:'0'
    },userType:{
      type:Number
    },Mobile:{
      type:String
    },videos:{
      type:Number,
      default:0
    },created:{
      type:String,
      default:""
    },user_old_fb:{
      type:String
    },mobile_verify:{
      type:Boolean,
      default:false
=======
    bearer_token:{
      type:String
>>>>>>> origin/tekeshwar
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model("user_detail", EventSchema)
