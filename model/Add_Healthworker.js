const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema
require('mongoose-double')(mongoose)

var SchemaTypes = mongoose.Schema.Types

const EventSchema = new mongoose.Schema(
    {

        health_worker_course: {
            type: String
        },
        Certificate: {
            type: String
        },
        experience: {
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
        Clinic: {
            type: String
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
        bearer_token: {
            type: String
        },
        approval: {
            type: String,
            default: "0"
        },
        Block_User: {
            type: String
        }
    },
    { timestamps: true }
)

/* Digital_clinic_details: {
 
     State: {
         type: String,
         default: ""
     },
     city: {
         type: String,
         default: ""
     },
     pincode: {
         type: String,
         default: ""
     },
     Upload_clinic_images: {
         type: String,
         default: ""
     }
 
 },
 Professional_Detail: {
     Health_Worker_Course: {
         type: String,
         default: ""
     },
     Upload_Certificate: {
         type: String,
         default: ""
     },
     Experience: {
         type: String,
         default: ""
     }
 },
 Personal_details: {
     Date_of_birth: {
         type: Date,
         default: ""
     },
     Gender: {
         type: String,
         default: ""
     },
     Blood_group: {
         type: String,
         default: ""
     }
 },
 Identity_Details: {
     Choose_on_identity_proof: {
         AadharCard: {
             type: String,
             default: ""
         },
         PancCard: {
             type: String,
             default: ""
         },
         VoterId: {
             type: String,
             default: ""
         }
     },
     Bank_Account_Details: {
         Account_No: {
             type: String,
             details: ""
         },
         Confirm_Account_No: {
             type: String,
             default: ""
         },
         IFSC_Code: {
             type: String,
             default: ""
         }
     }
 
 }
*/


module.exports = mongoose.model('Health_Worker', EventSchema)
