const mongoose = require('mongoose')
const schema = mongoose.Schema
const notificationSchema = new schema(
  {
    username:{
          type:String
    },
    profile_pic:{
        type:String
    },
    email:{
        type:String
    },
    notification_text:{
        type:String
    },
    docId:{
        type:String
    }
  },  
  { timestamps: true }
 
)

module.exports = mongoose.model('notification', notificationSchema)
