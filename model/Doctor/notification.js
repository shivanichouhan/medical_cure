const mongoose = require('mongoose')
const schema = mongoose.Schema
const notificationSchema = new schema(
  {
    username: {
      type: String
    },
    profile_pic: {
      type: String
    },
    email: {
      type: String
    },
    notification_text: {
      type: String
    },
    docId: {
      type: String
    }, healthworker_id: { type: String },
    patient_id: {
      type: String
    },notificationFor:{
      type:String
    }
  },
  { timestamps: true }

)

module.exports = mongoose.model('notification', notificationSchema)
