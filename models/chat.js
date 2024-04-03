const mongoose = require("mongoose")

const chatSchema = mongoose.Schema({
    chatName: {
        type: String,
        required: true,
        trim:true
    },
    isGroupChat: {
        type: Boolean,
        default: false   
    },
    chatAdmin: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }]
})

module.exports = mongoose.model("Chat",chatSchema)