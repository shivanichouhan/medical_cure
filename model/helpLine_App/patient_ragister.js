const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema

const UserImgSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    phone_number: {
        type: String
    }, device_token: {
        type: String
    }, otp: {
        type: String
    }, mobile_verify: {
        type: String,
        default: "0"
    }, profile_pic: {
        type: String,
        default: "https://image.freepik.com/free-vector/doctor-character-background_1270-84.jpg"
    }
}, { timestamps: true }

);

module.exports = mongoose.model('HelpLine_patient', UserImgSchema);
