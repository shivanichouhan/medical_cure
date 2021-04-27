const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
require('mongoose-double')(mongoose);

// var SchemaTypes = mongoose.Schema.Types;

const Chat_notification = new mongoose.Schema(
    {
        drId: {
            type: String,
            required: true
        }, pid: {
            type: String
        }, msg: {
            type: String,
            required: true
        }, created: {
            type: String
        }, rooms_name: {
            type: String
        }, currentTime: { type: String },
        chat_image: {
            type: String
        }, username: { type: String },
        h_name: { type: String }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Chat_notification", Chat_notification);
