const mongoose = require('mongoose')

const messageSchema = {
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    content: {
        type: String,
        trim: true
    },
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat"
    }
}

const messageModel = mongoose.Schema(messageSchema, { timestamps: true })
const Message = mongoose.model("Chat", messageModel)
module.exports = Message