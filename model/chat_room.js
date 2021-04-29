const mongoose = require('mongoose');

const UserImgSchema = mongoose.Schema({
    match_id: {
        type: String,
    },
    room: {
        type: String
    },user_one:{
        type:String
    },user_two:{
        type:String
    }
});

module.exports = mongoose.model('chat_Room', UserImgSchema);