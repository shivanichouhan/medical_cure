const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema
require('mongoose-double')(mongoose)

var SchemaTypes = mongoose.Schema.Types

const EventSchema = new mongoose.Schema(
  {

    username: {
      type: String
    },
    email: {
      type: String
    },
    password: {

      type: String
    },
    Mobile: {
      type: String,
      default: '0'
    }
  })

/*user_id: {
  type: String
}, email: {
  type: String,
  default: " "
},
password: {
  type: String
},
username: {
  type: String,
  default: ''
}, user_Dob: {
  type: Date,
  default: ''
},
resetPasswordToken: {
  type: String
},
verified: {
  type: Number,
  default: 0
},
first_name: {
  type: String,
  default: ""
},
last_name: {
  type: String,
  default: " "
},
gender: {
  type: String,
  default: ""
},
Dob: {
  type: String,
  default: ""
},
bio: {
  type: String,
  default: ''
},
profile_pic: {
  type: String,
  default: 'https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659651_960_720.png'
},
country: {
  type: String,
  default: ''
},
flag: {
  type: String,
  default: "https://cdn.britannica.com/97/1597-004-05816F4E/Flag-India.jpg"
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
device: {
  type: String
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
  default: ''
},
language: {
  type: String,
  default: ''
},
account_type: {
  type: String,
  default: 'Public'
},
deactivation: {
  type: Boolean,
  default: false
},
action: { type: String },
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
], device_token: {
  type: String
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
  default: '0'
},
allow_sharing: {
  type: String,
  default: '0'
}, userType: {
  type: Number
}, Mobile: {
  type: String,
  default: ""
}, videos: {
  type: Number,
  default: 0
}, created: {
  type: String,
  default: ""
}, user_old_fb: {
  type: String
}, mobile_verify: {
  type: Boolean,
  default: false
}
},
{ timestamps: true }*/


module.exports = mongoose.model('User_data', EventSchema)
